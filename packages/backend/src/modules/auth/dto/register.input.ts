import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsIn } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(128, { message: 'Password must not exceed 128 characters' })
  password: string;

  @Field()
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long' })
  @MaxLength(50, { message: 'First name must not exceed 50 characters' })
  firstName: string;

  @Field()
  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long' })
  @MaxLength(50, { message: 'Last name must not exceed 50 characters' })
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['AR', 'ES'], { message: 'Country must be AR or ES' })
  country?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(['es-AR', 'es-ES'], { message: 'Language must be es-AR or es-ES' })
  language?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100, { message: 'Family name must not exceed 100 characters' })
  familyName?: string;
}