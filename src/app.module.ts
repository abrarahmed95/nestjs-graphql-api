import {
  CacheInterceptor,
  CacheModule,
  ClassSerializerInterceptor,
  Module,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { UserModule } from './user/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommonModule } from './common/common.module';
import { TeamModule } from './team/team.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: 6379,
      },
    }),
    CacheModule.register({
      ttl: 5,
      max: 10,
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: 6379,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': true,
      },
      // transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      // installSubscriptionHandlers: true,
      // buildSchemaOptions: {
      //   directives: [
      //     new GraphQLDirective({
      //       name: 'upper',
      //       locations: [DirectiveLocation.FIELD_DEFINITION],
      //     }),
      //   ],
      // },
    }),
    AuthModule,
    UserModule,
    WorkspaceModule,
    ProjectModule,
    TerminusModule,
    HttpModule,
    TaskModule,
    CommonModule,
    TeamModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
