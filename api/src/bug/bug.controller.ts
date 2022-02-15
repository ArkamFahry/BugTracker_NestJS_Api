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
import { BugService } from './bug.service';
import { CreateBugDto } from './dto/create-bug.dto';
import { UpdateBugDto } from './dto/update-bug.dto';

@Controller('bug')
export class BugController {
  constructor(private readonly bugService: BugService) {}

  @Post()
  create(
    @GetCurrentUserId() userId: number,
    @Body() createBugDto: CreateBugDto,
  ) {
    return this.bugService.create(userId, createBugDto);
  }

  @Get()
  findAll() {
    return this.bugService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bugService.findOne(+id);
  }

  @Get('/findByUserId')
  findByUserId(@GetCurrentUserId() userId: number) {
    return this.bugService.findByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBugDto: UpdateBugDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.bugService.update(+id, updateBugDto, userId);
  }

  @Roles(Role.TESTER)
  @UseGuards(RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bugService.remove(+id);
  }
}
