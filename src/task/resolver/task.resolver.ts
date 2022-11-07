import { TaskService } from './../service/task.service';
import { Task } from './../entities/task.entity';
import { Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/auth/decorators';
import { User } from 'src/user/entities/user.entity';

@Resolver()
export class TaskResolver {
  constructor(private taskService: TaskService) {}
  @Query((type) => [Task])
  getUserTasks(@GqlUser() user: User): Promise<Task[]> {
    return this.taskService.findByCreatorId(user?.id);
  }
}
