import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchemaProvider } from './providers/user-schema.provider';

@Global()
@Module({
  imports: [
    MongooseModule.forFeatureAsync([UserSchemaProvider]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, MongooseModule, TypeOrmModule],
})
export class UserModule {}
