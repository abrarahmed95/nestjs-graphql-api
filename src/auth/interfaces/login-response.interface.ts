import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class UserLoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: User;
}
