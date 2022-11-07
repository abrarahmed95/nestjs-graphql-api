import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Workspace } from './entities/workspace.entity';
import { Tag } from './entities';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(Workspace)
    private workspaceRepository: Repository<Workspace>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async create(userId: string, createWorkspaceDto: CreateWorkspaceDto) {
    const user = await this.userService.findOne(userId);

    const workspace = this.workspaceRepository.create(createWorkspaceDto);
    workspace.user = user;

    return await this.workspaceRepository.save(workspace);
  }

  async find(options?: FindManyOptions<Workspace>) {
    return this.workspaceRepository.find(options);
  }

  async findByUserId(id: string): Promise<Workspace[]> {
    return this.find({ where: { user: { id } }, relations: { tags: true } });
  }

  async findOne(id: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne({
      where: { id },
      relations: { tags: true },
    });

    if (!workspace) {
      throw new NotFoundException();
    }

    return workspace;
  }

  async update(id: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    const result = await this.workspaceRepository.update(
      { id },
      updateWorkspaceDto,
    );

    if (!result.affected) {
      throw new NotFoundException();
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.workspaceRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException();
    }

    return !!result.affected;
  }

  async getAllTags(workspaceId: string): Promise<Tag[]> {
    return this.tagRepository.find({
      where: {
        workspaceId,
      },
    });
  }

  async createTag(workspaceId: string, createTagDto: CreateTagDto) {
    const workspace = await this.findOne(workspaceId);
    const tag = this.tagRepository.create(createTagDto);
    tag.workspace = workspace;

    return this.tagRepository.save(tag);
  }
}
