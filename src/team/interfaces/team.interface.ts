import { Field, InterfaceType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GQLSuccessResponse {
  @Field()
  status: boolean;
}
