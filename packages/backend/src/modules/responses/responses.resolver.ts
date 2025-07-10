import { Resolver } from '@nestjs/graphql';
import { Response } from '../../entities/response.entity';
import { ResponsesService } from './responses.service';

@Resolver(() => Response)
export class ResponsesResolver {
  constructor(private responsesService: ResponsesService) {}
}