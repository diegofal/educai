import { Resolver } from '@nestjs/graphql';
import { Progress } from '../../entities/progress.entity';
import { AnalyticsService } from './analytics.service';

@Resolver(() => Progress)
export class AnalyticsResolver {
  constructor(private analyticsService: AnalyticsService) {}
}