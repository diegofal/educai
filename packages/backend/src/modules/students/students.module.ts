import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../../entities/student.entity';
import { User } from '../../entities/user.entity';
import { Family } from '../../entities/family.entity';
import { StudentsService } from './students.service';
import { StudentsResolver } from './students.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Student, User, Family])],
  providers: [StudentsService, StudentsResolver],
  exports: [StudentsService],
})
export class StudentsModule {}