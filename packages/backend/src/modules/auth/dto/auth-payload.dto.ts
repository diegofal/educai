import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../../entities/user.entity';

@ObjectType()
export class AuthPayload {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}