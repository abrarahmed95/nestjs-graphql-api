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
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { CreateWorkspaceDto, FindOneParams } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Workspace } from './entities/workspace.entity';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { AuthUser } from 'src/user/decorators/auth-user.decorator';

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
    console.log(user);
    return this.workspaceService.create(user?.id, createWorkspaceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [Workspace] })
  findAll(@Req() req: Request) {
    const user = req.user as User;
    return this.workspaceService.findWorkspacesByUserId(user?.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one by id' })
  @ApiOkResponse({ type: Workspace })
  findOne(@Param() param: FindOneParams) {
    // return this.workspaceService.findOne(param?.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    return this.workspaceService.update(+id, updateWorkspaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workspaceService.remove(+id);
  }
}
