import { WorkspaceService } from './../workspace/workspace.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team) private teamRepository: Repository<Team>,
    private workspaceService: WorkspaceService,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const workspace = await this.workspaceService.findOne(
      createTeamDto?.workspaceId,
    );

    const team = this.teamRepository.create(createTeamDto);
    team.workspace = workspace;

    return this.teamRepository.save(team);
  }

  findTeamsByWorkspaceId(workspaceId: string) {
    return this.teamRepository.findBy({
      workspaceId,
    });
  }

  async findOne(id: string): Promise<Team> {
    return this.teamRepository.findOneByOrFail({
      id,
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const result = await this.teamRepository.update(
      {
        id,
      },
      updateTeamDto,
    );

    if (!result.affected) {
      throw new InternalServerErrorException();
    }

    return this.teamRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.teamRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException();
    }

    return !!result.affected;
  }
}
