import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Progress } from '../../entities/progress.entity';
import { AnalyticsService } from './analytics.service';
import { AnalyticsResolver } from './analytics.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Progress])],
  providers: [AnalyticsService, AnalyticsResolver],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}