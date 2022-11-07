import { User } from 'src/user/entities/user.entity';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { GqlUser } from 'src/auth/decorators';
import { Tag, Workspace } from '../entities';
import { WorkspaceService } from '../workspace.service';

@Resolver((of) => Workspace)
export class WorkspaceResolver {
  constructor(private workspaceService: WorkspaceService) {}

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
}
