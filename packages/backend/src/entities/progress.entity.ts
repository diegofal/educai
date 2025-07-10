import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Student } from './student.entity';

@ObjectType()
@Entity('progress')
export class Progress {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  domain: string; // arithmetic, geometry, etc.

  @Field(() => Float)
  @Column('decimal', { precision: 4, scale: 3 })
  thetaScore: number; // IRT ability for this domain

  @Field(() => Int)
  @Column()
  internationalPercentile: number; // Percentile vs international cohort

  @Field(() => Int)
  @Column()
  exercisesCompleted: number;

  @Field(() => Float)
  @Column('decimal', { precision: 3, scale: 2 })
  accuracy: number; // 0-1

  @Field(() => Int)
  @Column()
  timeSpentMinutes: number;

  @Field(() => Float)
  @Column('decimal', { precision: 3, scale: 2 })
  masteryLevel: number; // 0-1, calculated mastery

  @Field()
  @Column('jsonb')
  domainBreakdown: {
    [subdomain: string]: {
      accuracy: number;
      exercisesCompleted: number;
      masteryLevel: number;
    };
  };

  @Field()
  @Column('jsonb')
  weeklyStats: {
    week: number;
    year: number;
    exercisesCompleted: number;
    averageAccuracy: number;
    timeSpent: number;
    thetaGrowth: number;
  };

  @Field()
  @Column({ default: 'weekly' })
  measurementPeriod: string; // daily, weekly, monthly

  @Field()
  @CreateDateColumn()
  recordedAt: Date;

  // Relations
  @Field(() => Student)
  @ManyToOne(() => Student, student => student.progressRecords)
  student: Student;
}