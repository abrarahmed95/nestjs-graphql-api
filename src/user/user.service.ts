import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        workspaces: true,
      },
      cache: true,
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
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
