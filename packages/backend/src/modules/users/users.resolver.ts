import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { User } from '../../entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async me(@CurrentUser() user: User): Promise<User> {
    return this.usersService.findById(user.id);
  }

  @Query(() => Object)
  async familyDashboard(@CurrentUser() user: User) {
    return this.usersService.getFamilyDashboard(user.id);
  }
}