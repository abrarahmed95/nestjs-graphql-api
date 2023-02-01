import { User } from 'src/user/entities/user.entity';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/auth/decorators';
import { Tag, Workspace } from '../entities';
import { WorkspaceService } from '../workspace.service';
import { CreateWorkspaceDto } from '../dto/create-workspace.dto';

@Resolver((of) => Workspace)
export class WorkspaceResolver {
  constructor(private workspaceService: WorkspaceService) {}

  @Query((returns) => Workspace)
  async getWorkspace(
    @GqlUser() user: User,
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    return this.workspaceService.findOne(id);
  }

  @Query((returns) => [Workspace])
  async getWorkspaces(@GqlUser() user: User) {
    return this.workspaceService.findByUserId(user?.id);
  }

  @Query((returns) => [Tag])
  async getWorkspaceTags(
    @Args({ name: 'worksapceId', type: () => String }) workspaceId: string,
  ) {
    return this.workspaceService.getAllTags(workspaceId);
  }

  @Query((returns) => Workspace)
  async getWorkspaceBySlug(
    @Args({ name: 'slug', type: () => String }) slug: string,
  ) {
    return this.workspaceService.findBySlug(slug);
  }

  @Mutation((returns) => Workspace)
  createWorkspace(
    @GqlUser() user: User,
    @Args('workspaceInput') workspaceInput: CreateWorkspaceDto,
  ): Promise<Workspace> {
    return this.workspaceService.create(user?.id, workspaceInput);
  }
}
