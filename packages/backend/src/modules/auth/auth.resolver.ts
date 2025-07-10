import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthPayload } from './dto/auth-payload.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async register(
    @Args('input') registerInput: RegisterInput,
  ): Promise<AuthPayload> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthPayload)
  async login(
    @Args('input') loginInput: LoginInput,
  ): Promise<AuthPayload> {
    return this.authService.login(loginInput);
  }
}