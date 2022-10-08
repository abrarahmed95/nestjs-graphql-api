import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', { message: "Password don't match" })
  passwordConfirm: string;
}
