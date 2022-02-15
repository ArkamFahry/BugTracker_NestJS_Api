import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}
  async create(userId: number, dto: CreateTicketDto) {
    const created = new Date(dto.created);
    const closed = new Date(dto.closed);
    return await this.prisma.tickets.create({
      data: {
        bug_id: dto.bug_id,
        user_id: userId,
        created: created,
        closed: closed,
        description: dto.description,
        type: dto.type,
        sevierity: dto.sevierity,
        progress: dto.progress,
      },
    });
  }

  async findAll() {
    return await this.prisma.tickets.findMany();
  }

  findOne(id: number) {
    return this.prisma.tickets.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(userId: number, id: number, dto: UpdateTicketDto) {
    const created = new Date(dto.created);
    const closed = new Date(dto.closed);
    return await this.prisma.tickets.update({
      where: {
        id: id,
      },
      data: {
        bug_id: dto.bug_id,
        user_id: userId,
        created: created,
        closed: closed,
        description: dto.description,
        type: dto.type,
        sevierity: dto.sevierity,
        progress: dto.progress,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.tickets.delete({
      where: {
        id: id,
      },
    });
  }
}
