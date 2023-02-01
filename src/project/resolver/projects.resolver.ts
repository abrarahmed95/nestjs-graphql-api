import { ProjectService } from 'src/project/services/project.service';
import { CreateProjectDto } from './../dto/create-project.dto';
import { User } from './../../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/auth/decorators';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { Project } from '../entities/project.entity';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Resolver(() => Project)
@UseGuards(GqlAuthGuard)
export class ProjectsResolver {
  constructor(private projectService: ProjectService) {}
  @Mutation(() => Project)
  async createProject(
    @GqlUser() user: User,
    @Args('projectInput') createProjectInput: CreateProjectDto,
  ) {
    return this.projectService.create(user, createProjectInput);
  }

  @Query(() => Project)
  getProject(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.projectService.findOne(id);
  }

  @Mutation(() => Project)
  updateProject(
    @Args('id', { type: () => String })
    id: string,
    @Args('updateProjectInput') updateProjectInput: UpdateProjectDto,
  ) {
    return this.projectService.update(id, updateProjectInput);
  }

  @Mutation(() => Project)
  removeProject(@Args('id', { type: () => String }) id: string) {
    return this.projectService.remove(id);
  }

  @Query(() => [Project])
  getUserProjects(@GqlUser() user: User) {
    return this.projectService.findByUserId(user?.id);
  }
}
