import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from './user.entity';
import { Student } from './student.entity';

@ObjectType()
@Entity('families')
export class Family {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  familyName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  subscriptionPlan: string; // free, premium

  @Field()
  @Column({ default: 'active' })
  subscriptionStatus: string; // active, inactive, trial

  @Field({ nullable: true })
  @Column({ nullable: true })
  subscriptionExpiresAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  timezone: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @Field(() => User)
  @OneToOne(() => User, user => user.family)
  @JoinColumn()
  primaryUser: User;

  @Field(() => [Student])
  @OneToMany(() => Student, student => student.family)
  students: Student[];
}