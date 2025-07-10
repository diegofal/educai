import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  
  // Enable CORS for frontend communication
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://mathadapt.com',
      'https://*.mathadapt.com'
    ],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Set global prefix for REST endpoints
  app.setGlobalPrefix('api');

  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);
  
  console.log(`🚀 MathAdapt Backend running on: http://localhost:${port}`);
  console.log(`📊 GraphQL Playground: http://localhost:${port}/graphql`);
}

bootstrap();