import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  // @ApiProperty()
  // @IsOptional()
  // @IsString()
  // userId: string;
}

export class FindOneParams {
  @IsString()
  id: string;
}
