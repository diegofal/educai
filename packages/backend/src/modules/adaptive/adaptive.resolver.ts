import { Resolver } from '@nestjs/graphql';
import { AdaptiveService } from './adaptive.service';

@Resolver()
export class AdaptiveResolver {
  constructor(private adaptiveService: AdaptiveService) {}
}