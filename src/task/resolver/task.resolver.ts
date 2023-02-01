import { TaskService } from './../service/task.service';
import { Task } from './../entities/task.entity';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/auth/decorators';
import { User } from 'src/user/entities/user.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
@UseGuards(GqlAuthGuard)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Mutation((returns) => Task)
  createTask(
    @GqlUser() user: User,
    @Args('taskInput') createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(user, createTaskDto);
  }

  @Query((returns) => [Task])
  getUserTasks(@GqlUser() user: User): Promise<Task[]> {
    return this.taskService.findByCreatorId(user?.id);
  }

  @Query((returns) => [Task])
  getTeamTasks(
    @Args('teamId', { type: () => String }) teamId: string,
  ): Promise<Task[]> {
    return this.taskService.findByTeamId(teamId);
  }

  @Query((returns) => [Task])
  getWorkspaceTask(
    @Args({ name: 'workspaceId', type: () => String }) workspaceId: string,
  ) {
    return this.taskService.findByWorkspaceId(workspaceId);
  }
}
