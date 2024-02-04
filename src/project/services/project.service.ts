import { TeamService } from './../../team/team.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { Project } from '../entities/project.entity';
import { WorkspaceService } from './../../workspace/workspace.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private projectRepository: Repository<Project>,
    private workspaceService: WorkspaceService,
    private teamService: TeamService,
  ) {}

  async create(
    user: User,
    createProjectDto: CreateProjectDto,
  ): Promise<Project> {
    const workspace = await this.workspaceService.findOne(
      createProjectDto.workspaceId,
    );

    const project = this.projectRepository.create({
      ...createProjectDto,
      workspace: workspace,
      owner: user,
    });

    if (createProjectDto?.teamIds && Array.isArray(createProjectDto?.teamIds)) {
      const teams = await this.teamService.findByIds(createProjectDto.teamIds);
      project.teams = teams;
    }

    return this.projectRepository.save(project);
  }

  findAll() {
    return `This action returns all project`;
  }

  async findByUserId(id: string): Promise<Project[]> {
    return this.projectRepository.find({
      where: { owner: { id } },
    });
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const result = await this.projectRepository.update(
      { id },
      updateProjectDto,
    );

    if (!result.affected) {
      throw new InternalServerErrorException();
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.projectRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException();
    }

    return !!result.affected;
  }
}
