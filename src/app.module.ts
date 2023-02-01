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
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BullModule } from '@nestjs/bull';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CommonModule } from './common/common.module';
import { TeamModule } from './team/team.module';
import { ViewModule } from './view/view.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      url: process.env.DB_URI,
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      cache: {
        type: 'ioredis',
        options: {
          host: 'redis',
          port: 6379,
        },
        ignoreErrors: true,
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    // CacheModule.register({
    //   ttl: 5,
    //   max: 10,
    //   isGlobal: true,
    //   store: redisStore,
    //   host: 'redis',
    //   port: 6379,
    // }),
    MailerModule.forRoot({
      transport: {
        host: 'in-v3.mailjet.com',
        secure: false,
        auth: {
          user: '3d7d5e5a0c5c0a8749358020a4137fa5',
          pass: '8237bd9214d6d6b68b8547c6bd74a397',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
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
    ViewModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class AppModule {}
