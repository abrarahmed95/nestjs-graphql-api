import { Global, Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace, Tag } from './entities';
import { WorkspaceResolver } from './resovler/workspace.resolver';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Workspace, Tag])],
  controllers: [WorkspaceController],
  providers: [WorkspaceService, WorkspaceResolver],
  exports: [WorkspaceService],
})
export class WorkspaceModule {}
