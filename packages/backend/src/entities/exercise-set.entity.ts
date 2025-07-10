import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Student } from './student.entity';
import { Exercise } from './exercise.entity';

@ObjectType()
@Entity('exercise_sets')
export class ExerciseSet {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column()
  weekNumber: number;

  @Field(() => Int)
  @Column()
  year: number;

  @Field()
  @Column('jsonb')
  difficultyRange: {
    min: number;
    max: number;
  };

  @Field()
  @Column('jsonb')
  adaptiveParams: {
    targetAccuracy: number;
    progressionRate: number;
    difficultyAdjustment: number;
  };

  @Field()
  @Column({ default: 'active' })
  status: string; // active, completed, archived

  @Field(() => Int)
  @Column({ default: 0 })
  completedExercises: number;

  @Field(() => Int)
  @Column({ default: 10 })
  totalExercises: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  completedAt: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @Field(() => Student)
  @ManyToOne(() => Student, student => student.exerciseSets)
  student: Student;

  @Field(() => [Exercise])
  @OneToMany(() => Exercise, exercise => exercise.exerciseSet)
  exercises: Exercise[];
}