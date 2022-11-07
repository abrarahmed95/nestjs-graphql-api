import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTeamDto {
  @Field()
  name: string;

  @Field()
  workspaceId: string;
}
