import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBugDto } from './dto/create-bug.dto';
import { UpdateBugDto } from './dto/update-bug.dto';

@Injectable()
export class BugService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, dto: CreateBugDto) {
    const issue_created = new Date(dto.issue_created);
    const issue_closed = new Date(dto.issue_closed);
    return await this.prisma.bug.create({
      data: {
        project_id: dto.project_id,
        user_id: userId,
        name: dto.name,
        type: dto.type,
        description: dto.description,
        sevierity: dto.sevierity,
        progress: dto.progress,
        issue_created: issue_created,
        issue_closed: issue_closed,
      },
    });
  }

  async findAll() {
    return await this.prisma.bug.findMany();
  }

  findOne(id: number) {
    return this.prisma.bug.findUnique({
      where: {
        id: id,
      },
    });
  }

  findByUserId(userId: number) {
    return this.prisma.bug.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  async update(id: number, dto: UpdateBugDto, userId: number) {
    const issue_created = new Date(dto.issue_created);
    const issue_closed = new Date(dto.issue_closed);
    return await this.prisma.bug.update({
      where: {
        id: id,
      },
      data: {
        project_id: dto.project_id,
        user_id: userId,
        name: dto.name,
        type: dto.type,
        description: dto.description,
        sevierity: dto.sevierity,
        progress: dto.progress,
        issue_created: issue_created,
        issue_closed: issue_closed,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.bug.delete({
      where: {
        id: id,
      },
    });
  }
}
