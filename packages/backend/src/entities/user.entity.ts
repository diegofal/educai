import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Family } from './family.entity';
import { Student } from './student.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Hashed password

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  country: string; // AR, ES

  @Field({ nullable: true })
  @Column({ nullable: true })
  language: string; // es-AR, es-ES

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: false })
  emailVerified: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastLoginAt: Date;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @Field(() => Family, { nullable: true })
  @OneToOne(() => Family, family => family.primaryUser)
  family: Family;

  @Field(() => [Student])
  @OneToMany(() => Student, student => student.parent)
  children: Student[];
}