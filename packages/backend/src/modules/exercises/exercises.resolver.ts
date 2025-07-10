import { Resolver } from '@nestjs/graphql';
import { Exercise } from '../../entities/exercise.entity';
import { ExercisesService } from './exercises.service';

@Resolver(() => Exercise)
export class ExercisesResolver {
  constructor(private exercisesService: ExercisesService) {}
}