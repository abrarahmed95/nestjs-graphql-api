import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WorkspaceDocument } from './schemas/workspace.schema';
import { Model } from 'mongoose';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async create(userId: string, createWorkspaceDto: CreateWorkspaceDto) {
    const user = await this.userService.findOne(userId);

    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    workspace.user = user;

    return await this.workspaceRepository.save(workspace);
  }

  findAll(options?: FindOptionsWhere<Workspace>) {
    return this.workspaceRepository.findBy(options);
  }

  findWorkspacesByUserId(userId: string) {
    return this.findAll({ id: userId });
  }

  findOne(id: string) {
    return;
  }

  update(id: number, updateWorkspaceDto: UpdateWorkspaceDto) {
    return `This action updates a #${id} workspace`;
  }

  remove(id: number) {
    return `This action removes a #${id} workspace`;
  }
}
