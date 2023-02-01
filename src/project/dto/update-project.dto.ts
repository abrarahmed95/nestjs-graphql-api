import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateProjectDto {
  @Field(() => String)
  name: string;
}
