import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUserId, Roles } from 'src/common/decorators';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Role } from 'src/models/roles.enum';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Roles(Role.MANAGER)
  @UseGuards(RoleGuard)
  @Post()
  create(@GetCurrentUserId() userId: number, @Body() dto: CreateProjectDto) {
    return this.projectService.create(userId, dto);
  }

  @Roles(Role.MANAGER)
  @UseGuards(RoleGuard)
  @Get('/All')
  findAll() {
    return this.projectService.findAll();
  }

  @Roles(Role.MANAGER)
  @UseGuards(RoleGuard)
  @Get('/FindByUserId')
  findMany(@GetCurrentUserId() userId: number) {
    return this.projectService.findMany(userId);
  }

  @Roles(Role.MANAGER)
  @UseGuards(RoleGuard)
  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.projectService.findByName(name);
  }

  @Roles(Role.MANAGER)
  @UseGuards(RoleGuard)
  @Patch(':name')
  update(@Param('name') name: string, @Body() dto: UpdateProjectDto) {
    return this.projectService.update(name, dto);
  }

  @Roles(Role.MANAGER)
  @UseGuards(RoleGuard)
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.projectService.remove(name);
  }
}
