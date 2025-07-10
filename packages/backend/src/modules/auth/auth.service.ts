import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../entities/user.entity';
import { Family } from '../../entities/family.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './dto/auth-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
    private jwtService: JwtService,
  ) {}

  async register(registerInput: RegisterInput): Promise<AuthPayload> {
    const { email, password, firstName, lastName, country, language, familyName } = registerInput;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create family first
    const family = this.familyRepository.create({
      familyName: familyName || `${firstName} ${lastName} Family`,
      subscriptionPlan: 'free',
      subscriptionStatus: 'trial',
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trial
    });
    const savedFamily = await this.familyRepository.save(family);

    // Create user
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      country,
      language,
      family: savedFamily,
    });
    const savedUser = await this.userRepository.save(user);

    // Update family with primary user
    savedFamily.primaryUser = savedUser;
    await this.familyRepository.save(savedFamily);

    // Generate JWT token
    const token = this.jwtService.sign({ 
      sub: savedUser.id, 
      email: savedUser.email,
      familyId: savedFamily.id,
    });

    return {
      user: savedUser,
      token,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const { email, password } = loginInput;

    // Find user with family relation
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['family'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    user.lastLoginAt = new Date();
    await this.userRepository.save(user);

    // Generate JWT token
    const token = this.jwtService.sign({ 
      sub: user.id, 
      email: user.email,
      familyId: user.family?.id,
    });

    return {
      user,
      token,
    };
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId, isActive: true },
      relations: ['family', 'children'],
    });

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }

  async validateUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email, isActive: true },
      relations: ['family'],
    });
  }
}