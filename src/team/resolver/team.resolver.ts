import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Team } from './../entities/team.entity';
import { TeamService } from './../team.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTeamDto } from '../dto/create-team.dto';
import { GQLSuccessResponse } from '../interfaces/team.interface';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(GqlAuthGuard)
export class TeamResolver {
  constructor(private teamService: TeamService) {}

  @Mutation(() => Team)
  async createTeam(
    @Args('teamInput') createTeamDto: CreateTeamDto,
  ): Promise<Team> {
    return this.teamService.create(createTeamDto);
  }

  @Query(() => Team)
  async getTeam(@Args('id') id: string): Promise<Team> {
    return this.teamService.findOne(id);
  }

  @Query(() => [Team])
  async getWorkspaceTeams(
    @Args('workspaceId') workspaceId: string,
  ): Promise<Team[]> {
    return this.teamService.findTeamsByWorkspaceId(workspaceId);
  }

  @Mutation(() => GQLSuccessResponse)
  async deleteTeam(@Args('id') id: string): Promise<{ status: boolean }> {
    return {
      status: await this.teamService.remove(id),
    };
  }
}
