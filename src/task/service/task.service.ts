import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { DataSource, FindManyOptions, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private dataSource: DataSource,
    private userService: UserService,
  ) {}

  async create(user: User, createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    task.creator = user;

    if (createTaskDto?.assigneeIds?.length !== 0) {
      const assignee = await this.userService.getUsersById(
        createTaskDto.assigneeIds,
      );
      task.assignee = assignee;
    }

    if (createTaskDto?.subTasks && createTaskDto?.subTasks?.length !== 0) {
      createTaskDto.subTasks.forEach((subTaskDto) => {
        const subTask = this.taskRepository.create(subTaskDto);
        subTask.parent = task;
        subTask.creator = user;

        task.subTasks.push(subTask);
      });
    }

    return this.taskRepository.save(task);
  }

  find(options?: FindManyOptions<Task>): Promise<Task[]> {
    return this.taskRepository.find(options);
  }

  async findOne(id: string): Promise<Task> {
    const task = this.taskRepository.findOneBy({ id });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async findByWorkspaceId(id: string): Promise<Task[]> {
    return this.find({
      where: {
        workspace: { id },
      },
    });
  }

  async findByCreatorId(id: string): Promise<Task[]> {
    return this.find({
      where: { creatorId: id },
      relations: {
        assignee: true,
        subTasks: true,
        parent: true,
      },
    });
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
