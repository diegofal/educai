import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../../entities/exercise.entity';
import { ExerciseSet } from '../../entities/exercise-set.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    @InjectRepository(ExerciseSet)
    private exerciseSetRepository: Repository<ExerciseSet>,
  ) {}

  async findExercisesByDifficulty(minDifficulty: number, maxDifficulty: number): Promise<Exercise[]> {
    return this.exerciseRepository.find({
      where: {
        difficulty: require('typeorm').Between(minDifficulty, maxDifficulty),
        isActive: true,
      },
    });
  }
}