import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponse {
  @ApiProperty()
  email: string;

  @ApiProperty()
  accessToken: string;
}
