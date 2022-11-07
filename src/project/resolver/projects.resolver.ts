import { User } from './../../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/auth/decorators';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class ProjectsResolver {
  @Query(() => String)
  sayHello(@GqlUser() user: User) {
    console.log(user);
    return 'hello world';
  }
}
