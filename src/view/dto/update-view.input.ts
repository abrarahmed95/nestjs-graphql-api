import { CreateViewInput } from './create-view.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateViewInput extends PartialType(CreateViewInput) {
  @Field(() => Int)
  id: number;
}
