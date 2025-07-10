import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { User } from './user.entity';
import { Family } from './family.entity';
import { ExerciseSet } from './exercise-set.entity';
import { Response } from './response.entity';
import { Progress } from './progress.entity';

@ObjectType()
@Entity('students')
export class Student {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  birthDate: Date;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  grade: number; // 0-6 for ages 3-12

  @Field(() => Float)
  @Column('decimal', { precision: 4, scale: 3, default: 0.0 })
  currentTheta: number; // IRT ability estimate

  @Field(() => Int)
  @Column({ default: 50 })
  targetPercentile: number; // International benchmark target

  @Field(() => Int)
  @Column({ default: 0 })
  totalExercisesCompleted: number;

  @Field(() => Int)
  @Column({ default: 0 })
  totalTimeSpentMinutes: number;

  @Field(() => Float)
  @Column('decimal', { precision: 3, scale: 2, default: 0.0 })
  averageAccuracy: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastActivityAt: Date;

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
  @Field(() => User)
  @ManyToOne(() => User, user => user.children)
  parent: User;

  @Field(() => Family)
  @ManyToOne(() => Family, family => family.students)
  family: Family;

  @Field(() => [ExerciseSet])
  @OneToMany(() => ExerciseSet, exerciseSet => exerciseSet.student)
  exerciseSets: ExerciseSet[];

  @Field(() => [Response])
  @OneToMany(() => Response, response => response.student)
  responses: Response[];

  @Field(() => [Progress])
  @OneToMany(() => Progress, progress => progress.student)
  progressRecords: Progress[];
}