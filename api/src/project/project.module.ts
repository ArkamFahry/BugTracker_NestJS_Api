import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { RoleGuard } from 'src/common/guards/role.guard';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, RoleGuard],
})
export class ProjectModule {}
