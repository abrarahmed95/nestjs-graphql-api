import { UserService } from 'src/user/user.service';
import { LoginUserDto } from './../dto/login-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload, UserLoginResponse } from './../interfaces';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync({ sub: user.id, email: user.email });
  }

  async login(loginUserDto: LoginUserDto): Promise<UserLoginResponse> {
    const user = await this.userService.findOneByEmail(loginUserDto?.email);
    await this.checkPassword(user, loginUserDto);
    const accessToken = await this.createAccessToken(user);

    return {
      email: user.email,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = this.userService.findOne(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  private async checkPassword(
    user: User,
    loginUserDto: LoginUserDto,
  ): Promise<boolean> {
    return user.comparePassword(loginUserDto.password);
  }
}
