import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectUserDto } from './dto/create-project-user.dto';
import { UpdateProjectUserDto } from './dto/update-project-user.dto';

@Injectable()
export class ProjectUserService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateProjectUserDto) {
    return await this.prisma.projectUser.create({
      data: {
        project_id: dto.project_id,
        project_user: dto.project_user,
      },
    });
  }

  async findAll() {
    return await this.prisma.projectUser.findMany();
  }

  async findByUser(userId: number) {
    return await this.prisma.projectUser.findMany({
      where: {
        project_user: userId,
      },
    });
  }

  async findByProject(projectId: number) {
    return await this.prisma.projectUser.findMany({
      where: {
        project_id: projectId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.projectUser.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, dto: UpdateProjectUserDto) {
    return await this.prisma.projectUser.update({
      where: {
        id: id,
      },
      data: {
        project_id: dto.project_id,
        project_user: dto.project_user,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.projectUser.delete({
      where: {
        id: id,
      },
    });
  }
}
