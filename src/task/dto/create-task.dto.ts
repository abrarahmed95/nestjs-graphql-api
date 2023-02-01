import { Priority, Status } from './../entities/task.entity';
import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateTaskDto {
  @ApiProperty()
  @IsString()
  @Field()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true, defaultValue: '' })
  description?: string;

  @ApiProperty()
  @IsString()
  @Field(() => String)
  teamId: string;

  @ApiProperty()
  @IsOptional()
  @Field((type) => [CreateTaskDto], { nullable: true, defaultValue: [] })
  subTasks?: CreateTaskDto[];

  @ApiProperty()
  @IsOptional()
  @Field((type) => [String], { nullable: true, defaultValue: [] })
  assigneeIds?: string[];

  @ApiProperty()
  @IsOptional()
  @Field((type) => Priority, {
    nullable: true,
  })
  priority?: Priority;

  @ApiProperty()
  @IsOptional()
  @Field((type) => Status, {
    nullable: true,
  })
  status: Status;
}
