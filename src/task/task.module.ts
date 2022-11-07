import { Task } from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { TaskService } from './service/task.service';
import { TaskController } from './controller/task.controller';
import { TaskResolver } from './resolver/task.resolver';
import { TaskGateway } from './gateway/task.gateway';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService, TaskResolver, TaskGateway],
  exports: [TaskService],
})
export class TaskModule {}
