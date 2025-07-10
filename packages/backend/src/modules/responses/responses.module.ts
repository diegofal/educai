import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Response } from '../../entities/response.entity';
import { ResponsesService } from './responses.service';
import { ResponsesResolver } from './responses.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  providers: [ResponsesService, ResponsesResolver],
  exports: [ResponsesService],
})
export class ResponsesModule {}