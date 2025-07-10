import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from '../../entities/exercise.entity';
import { ExerciseSet } from '../../entities/exercise-set.entity';
import { ExercisesService } from './exercises.service';
import { ExercisesResolver } from './exercises.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, ExerciseSet])],
  providers: [ExercisesService, ExercisesResolver],
  exports: [ExercisesService],
})
export class ExercisesModule {}