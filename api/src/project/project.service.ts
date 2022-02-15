import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, dto: CreateProjectDto) {
    return await this.prisma.project.create({
      data: {
        user_id: userId,
        name: dto.name,
        type: dto.type,
        description: dto.description,
      },
    });
  }

  findAll() {
    return this.prisma.project.findMany();
  }

  findMany(userId: number) {
    return this.prisma.project.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  findByName(name: string) {
    return this.prisma.project.findMany({
      where: {
        name: name,
      },
    });
  }

  async update(name: string, dto: UpdateProjectDto) {
    return await this.prisma.project.update({
      where: {
        name: name,
      },
      data: {
        user_id: dto.user_id,
        name: dto.name,
        type: dto.type,
        description: dto.description,
      },
    });
  }

  async remove(name: string) {
    return await this.prisma.project.delete({
      where: {
        name: name,
      },
    });
  }
}
