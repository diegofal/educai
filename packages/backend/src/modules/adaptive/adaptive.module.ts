import { Module } from '@nestjs/common';
import { AdaptiveService } from './adaptive.service';
import { AdaptiveResolver } from './adaptive.resolver';

@Module({
  providers: [AdaptiveService, AdaptiveResolver],
  exports: [AdaptiveService],
})
export class AdaptiveModule {}