import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Family } from '../../entities/family.entity';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, Family])],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}