import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

// Import modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StudentsModule } from './modules/students/students.module';
import { ExercisesModule } from './modules/exercises/exercises.module';
import { ResponsesModule } from './modules/responses/responses.module';
import { AdaptiveModule } from './modules/adaptive/adaptive.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

// Import entities
import { User } from './entities/user.entity';
import { Family } from './entities/family.entity';
import { Student } from './entities/student.entity';
import { ExerciseSet } from './entities/exercise-set.entity';
import { Exercise } from './entities/exercise.entity';
import { Response } from './entities/response.entity';
import { Progress } from './entities/progress.entity';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [User, Family, Student, ExerciseSet, Exercise, Response, Progress],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
    }),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
      cors: {
        origin: ['http://localhost:3000', 'https://mathadapt.com'],
        credentials: true,
      },
    }),

    // Feature modules
    AuthModule,
    UsersModule,
    StudentsModule,
    ExercisesModule,
    ResponsesModule,
    AdaptiveModule,
    AnalyticsModule,
  ],
})
export class AppModule {}