import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Student } from '../../entities/student.entity';
import { StudentsService } from './students.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { User } from '../../entities/user.entity';

@Resolver(() => Student)
@UseGuards(JwtAuthGuard)
export class StudentsResolver {
  constructor(private studentsService: StudentsService) {}

  @Query(() => [Student])
  async myStudents(@CurrentUser() user: User): Promise<Student[]> {
    return this.studentsService.getStudentsByFamily(user.id);
  }

  @Query(() => Student)
  async student(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Student> {
    return this.studentsService.getStudentById(user.id, id);
  }
}