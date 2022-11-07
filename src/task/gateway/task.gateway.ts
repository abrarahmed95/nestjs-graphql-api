import {
  ClassSerializerInterceptor,
  Logger,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';
import { Socket } from 'dgram';
import { WsUser } from 'src/auth/decorators/ws-user.decorator';
import { User } from 'src/user/entities/user.entity';

import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';
import { ProjectService } from 'src/project/services/project.service';
import { CreateProjectDto } from 'src/project/dto/create-project.dto';
import { TaskService } from '../service/task.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import {
  connectable,
  delay,
  from,
  interval,
  map,
  mapTo,
  merge,
  Observable,
  of,
  publish,
} from 'rxjs';

@Catch()
export class AllExceptionsFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}

export enum TaskEvent {
  CREATE = 'createTask',
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UseGuards(WsAuthGuard)
@UseFilters(AllExceptionsFilter)
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class TaskGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger: Logger;
  @WebSocketServer() server;

  constructor(private taskService: TaskService) {
    this.logger = new Logger(TaskGateway.name);
  }

  @SubscribeMessage(TaskEvent.CREATE)
  async handleMessage(
    @WsUser() user: User,
    client: Socket,
    @MessageBody() payload: CreateTaskDto,
  ) {
    const task = await this.taskService.create(user, payload);
    return {
      command: TaskEvent.CREATE,
      data: task,
    };
  }

  @SubscribeMessage('events')
  onEvent(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: any,
  ): Observable<WsResponse<any>> | any {
    const event = 'events';
  }

  afterInit(): void {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket): void {
    this.logger.log(`Client disconnected: ${client['id']}`);
  }

  handleConnection(client: Socket, ...args: any[]): void {
    this.logger.log(`Client connected: ${client['id']}`);
  }
}
