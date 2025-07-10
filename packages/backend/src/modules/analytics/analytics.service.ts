import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Progress } from '../../entities/progress.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Progress)
    private progressRepository: Repository<Progress>,
  ) {}
}