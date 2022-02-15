import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthSignInDto, AuthSignUpDto } from './dto';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(dto: AuthSignUpDto): Promise<Tokens> {
    const hash = await this.hashPassword(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        hash: hash,
        role: dto.role,
      },
    });

    const tokens = await this.getTokens(
      newUser.id,
      newUser.email,
      newUser.role,
    );
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async signin(dto: AuthSignInDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await compare(dto.password, user.hash);

    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }
  async refresh(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt) throw new ForbiddenException('Access Denied');

    const rtMatch = await compare(rt, user.hashedRt);

    if (!rtMatch) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: number, Rt: string) {
    const hash = await this.hashPassword(Rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  hashPassword(data: string) {
    return hash(data, 10);
  }

  async getTokens(
    userId: number,
    email: string,
    role: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: 'at-secret',
          expiresIn: 900,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
          role,
        },
        {
          secret: 'rt-secret',
          expiresIn: 25200,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
