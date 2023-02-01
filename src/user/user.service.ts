import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    await this.isEmailUnique(user.email);

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUsersById(userIds: string[]): Promise<User[]> {
    return this.userRepository.find({
      where: { id: In(userIds) },
    });
  }

  async findOne(id: string): Promise<User> {
    console.log('findOne');
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        workspaces: true,
      },
    });

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    console.log('findOneByEmail');
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        workspaces: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    // return this.userRepository.update({ id }, updateUserDto);
    return;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async isEmailUnique(email: string): Promise<void> {
    const user = await this.userRepository.findOneBy({
      email,
    });

    if (user) {
      throw new BadRequestException('Email must be unique');
    }
  }
}
