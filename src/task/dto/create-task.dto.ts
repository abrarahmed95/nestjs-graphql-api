import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  subTasks?: CreateTaskDto[];

  @ApiProperty()
  assigneeIds: string[];
}
