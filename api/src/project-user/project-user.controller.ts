import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectUserService } from './project-user.service';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';

@Controller('project-user')
export class ProjectUserController {
  constructor(private readonly projectUserService: ProjectUserService) {}

  @Post()
  create(@Body() dto: CreateProjectUserDto) {
    return this.projectUserService.create(dto);
  }

  @Get()
  findAll() {
    return this.projectUserService.findAll();
  }

  @Get('findByUSer/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.projectUserService.findByUser(+userId);
  }

  @Get('findByUSer/:projectId')
  findByProject(@Param('projectId') projectId: string) {
    return this.projectUserService.findByProject(+projectId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProjectUserDto) {
    return this.projectUserService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectUserService.remove(+id);
  }
}
