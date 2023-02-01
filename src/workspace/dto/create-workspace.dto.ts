import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@InputType()
export class CreateWorkspaceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Field()
  slug: string;
  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // userId: string;
}

export class FindOneParams {
  @IsString()
  id: string;
}
