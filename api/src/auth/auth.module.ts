import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RtStrategy } from './strateges';
import { AtGuard, RtGuard } from 'src/common/guards';

@Module({
  imports: [JwtModule.register({}), AtGuard, RtGuard, AtStrategy, RtStrategy],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
