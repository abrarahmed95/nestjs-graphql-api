import { Project } from './../entities/project.entity';
import { JwtAuthGuard } from './../../auth/guards/jwt-auth.guard';
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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { ProjectService } from '../services/project.service';
import { AuthUser } from 'src/user/decorators';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Project')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Create Project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiResponse({ type: Project })
  create(@AuthUser() user: User, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(user, createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get user projects' })
  @ApiResponse({ type: Project, isArray: true })
  findAll(@AuthUser() user: User) {
    return this.projectService.findByUserId(user?.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: Project })
  async findOne(@Param('id') id: string): Promise<Project> {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Delete project' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: Project })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ type: Boolean })
  async remove(@Param('id') id: string): Promise<{ data: boolean }> {
    return {
      data: await this.projectService.remove(id),
    };
  }
}
