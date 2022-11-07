import { CreateTagDto } from './dto/create-tag.dto';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Query,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto, FindOneParams } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Workspace } from './entities/workspace.entity';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { Tag } from './entities';

@ApiTags('Workspace')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('workspaces')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  @ApiBody({ type: CreateWorkspaceDto })
  create(
    @AuthUser() user: User,
    @Body()
    createWorkspaceDto: CreateWorkspaceDto,
  ) {
    return this.workspaceService.create(user?.id, createWorkspaceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find all user workspaces' })
  @ApiOkResponse({ type: [Workspace] })
  findAll(@AuthUser() user: User) {
    return this.workspaceService.findByUserId(user?.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one by id' })
  @ApiOkResponse({ type: Workspace })
  findOne(@Param() param: FindOneParams) {
    return this.workspaceService.findOne(param?.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update workspace' })
  @ApiOkResponse({ type: Workspace })
  @ApiParam({ name: 'id', type: String })
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(id, updateWorkspaceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete workspace ' })
  @ApiParam({ name: 'id', type: String })
  async remove(@Param('id') id: string): Promise<{ data: boolean }> {
    return {
      data: await this.workspaceService.remove(id),
    };
  }

  @Get(':id/tags')
  @ApiOperation({ summary: 'Get all tags' })
  @ApiOkResponse({ type: [Tag] })
  getTags(@Param('id') workspaceId: string) {
    return this.workspaceService.getAllTags(workspaceId);
  }

  @Post(':id/tags')
  @ApiOperation({ summary: 'Create new tag' })
  @ApiOkResponse({ type: Tag })
  createTag(
    @Param('id') workspaceId: string,
    @Body() createTagDto: CreateTagDto,
  ) {
    return this.workspaceService.createTag(workspaceId, createTagDto);
  }
}
