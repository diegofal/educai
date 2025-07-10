import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { Student } from './student.entity';
import { Exercise } from './exercise.entity';

@ObjectType()
@Entity('responses')
export class Response {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column('jsonb')
  responseData: {
    answer: string | number | string[];
    selectedOption?: string;
    steps?: string[];
    workShown?: string;
  };

  @Field()
  @Column()
  isCorrect: boolean;

  @Field(() => Int)
  @Column()
  timeSpentSeconds: number;

  @Field(() => Int)
  @Column({ default: 0 })
  hintsUsed: number;

  @Field(() => Float)
  @Column('decimal', { precision: 4, scale: 3 })
  thetaBefore: number; // IRT ability before this response

  @Field(() => Float)
  @Column('decimal', { precision: 4, scale: 3 })
  thetaAfter: number; // IRT ability after this response

  @Field(() => Float)
  @Column('decimal', { precision: 4, scale: 3 })
  expectedDifficulty: number; // Expected difficulty for this student

  @Field(() => Float)
  @Column('decimal', { precision: 3, scale: 2 })
  informationGain: number; // Psychometric information gained

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  feedback: string; // AI-generated feedback

  @Field()
  @Column({ default: false })
  needsReview: boolean; // Flag for learning gaps

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @Field(() => Student)
  @ManyToOne(() => Student, student => student.responses)
  student: Student;

  @Field(() => Exercise)
  @ManyToOne(() => Exercise, exercise => exercise.responses)
  exercise: Exercise;
}