import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from '../service/auth.service';
import { UserLoginResponse } from './../interfaces/login-response.interface';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { User } from 'src/user/entities/user.entity';
import { AuthUser } from 'src/user/decorators';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ type: UserLoginResponse })
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserLoginResponse> {
    return this.authService.login(loginUserDto);
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User signup' })
  @ApiResponse({ type: User })
  signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user' })
  @ApiResponse({ type: User })
  async getCurrentUser(@AuthUser() user: User): Promise<User> {
    return user;
  }
}
