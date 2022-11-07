import { HttpModule } from '@nestjs/axios';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Global, Module } from '@nestjs/common';
import { ProjectController } from './controller/project.controller';
import { ProjectService } from './services/project.service';
import { ProjectsResolver } from './resolver/projects.resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Project]), HttpModule],
  controllers: [ProjectController],
  providers: [ProjectService, ProjectsResolver],
  exports: [ProjectService],
})
export class ProjectModule {}
