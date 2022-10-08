import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { ProjectModule } from './project/project.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { UserModule } from './user/user.module';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
    }),
    TypeOrmModule.forRoot({
      host: process.env.DB_HOST,
      type: 'postgres',
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    // RedisModule.register({
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
    AuthModule,
    UserModule,
    WorkspaceModule,
    ProjectModule,
    TerminusModule,
    HttpModule,
    TaskModule,
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
