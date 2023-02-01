import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(15)
  @Field()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Field()
  workspaceId: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  @Field(() => [String])
  teamIds?: string[];
}
