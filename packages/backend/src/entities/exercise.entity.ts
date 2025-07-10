import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { ExerciseSet } from './exercise-set.entity';
import { Response } from './response.entity';

@ObjectType()
@Entity('exercises')
export class Exercise {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  itemId: string; // Reference to item bank

  @Field()
  @Column()
  domain: string; // arithmetic, geometry, algebra, etc.

  @Field()
  @Column()
  subdomain: string; // addition, subtraction, shapes, etc.

  @Field(() => Float)
  @Column('decimal', { precision: 4, scale: 3 })
  difficulty: number; // IRT difficulty parameter (0-1)

  @Field(() => Int)
  @Column()
  internationalPercentile: number; // TIMSS/PISA benchmark

  @Field()
  @Column('jsonb')
  irtParams: {
    discrimination: number;
    difficulty: number;
    guessing: number;
  };

  @Field()
  @Column()
  type: string; // multiple_choice, word_problem, drag_drop, etc.

  @Field()
  @Column('text')
  statement: string; // Problem statement

  @Field()
  @Column('jsonb', { nullable: true })
  options: string[]; // For multiple choice

  @Field()
  @Column('jsonb')
  hints: string[];

  @Field()
  @Column('text')
  solution: string;

  @Field()
  @Column('jsonb', { nullable: true })
  solutionSteps: string[]; // Step-by-step solution

  @Field(() => Int)
  @Column()
  expectedTimeSeconds: number;

  @Field()
  @Column({ default: 'es' })
  language: string; // es-AR, es-ES

  @Field()
  @Column()
  benchmarkSource: string; // TIMSS_2019, PISA_2022, etc.

  @Field(() => Int)
  @Column()
  ageRangeMin: number;

  @Field(() => Int)
  @Column()
  ageRangeMax: number;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @Field(() => ExerciseSet)
  @ManyToOne(() => ExerciseSet, exerciseSet => exerciseSet.exercises)
  exerciseSet: ExerciseSet;

  @Field(() => [Response])
  @OneToMany(() => Response, response => response.exercise)
  responses: Response[];
}