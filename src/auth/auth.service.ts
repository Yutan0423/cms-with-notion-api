import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto';
import { Msg, Jwt } from './interfaces/auth.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(dto: AuthDto): Promise<Msg> {
    const hashed = await bcrypt.hash(dto.password, 12);
    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hashed,
        },
      });

      return {
        message: 'OK',
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('This email is already taken.');
        }
      }
      throw err;
    }
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Email or password is incorrect.');

    const isValid = await bcrypt.compare(dto.password, user.password);
    if (!isValid)
      throw new ForbiddenException('Email or password is incorrect.');

    return this.generateJwt(user.id, user.email);
  }

  async generateJwt(userId: number, email: string): Promise<Jwt> {
    const payload = {
      sub: userId,
      email,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '5m',
      secret: secret,
    });
    return {
      accessToken: token,
    };
  }
}
