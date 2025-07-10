import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Family } from '../../entities/family.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Family)
    private familyRepository: Repository<Family>,
  ) {}

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['family', 'children'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['family', 'children'],
    });
  }

  async updateProfile(userId: string, updateData: Partial<User>): Promise<User> {
    const user = await this.findById(userId);
    
    // Update allowed fields
    const allowedFields = ['firstName', 'lastName', 'country', 'language'];
    allowedFields.forEach(field => {
      if (updateData[field] !== undefined) {
        user[field] = updateData[field];
      }
    });

    return this.userRepository.save(user);
  }

  async getFamilyDashboard(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: [
        'family',
        'children',
        'children.exerciseSets',
        'children.responses',
        'children.progressRecords'
      ],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      user,
      family: user.family,
      children: user.children,
    };
  }
}