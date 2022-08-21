import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserInfo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getLoginUser(userId: number): Promise<Omit<User, 'password'>> {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  getUsers(): Promise<Omit<User[], 'password'>> {
    return this.prisma.user.findMany();
  }

  getUserInfo(userId: number): Promise<any> {
    const userInfo = this.prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        userInfo: {
          select: {
            notionKey: true,
            notionDatabaseId: true,
            twitterUrl: true,
            instagramUrl: true,
            githubUrl: true,
            linkedinUrl: true,
          },
        },
      },
    });

    return userInfo;
  }

  async createUserInfo(userId: number, dto: CreateUserInfoDto): Promise<any> {
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        nickname: dto.nickname,
      },
    });

    const userInfo = await this.prisma.userInfo.create({
      data: {
        userId,
        notionKey: dto.notionKey,
        notionDatabaseId: dto.notionDatabaseId,
        twitterUrl: dto.twitterUrl,
        instagramUrl: dto.instagramUrl,
        githubUrl: dto.githubUrl,
        linkedinUrl: dto.linkedinUrl,
      },
    });

    return userInfo;
  }

  async updateUserInfo(userId: number, dto: UpdateUserInfoDto): Promise<any> {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        nickname: dto.nickname,
      },
    });
    if (!user || user.id !== userId)
      throw new ForbiddenException('No permission to update');

    const userInfo = await this.prisma.userInfo.update({
      where: {
        userId: userId,
      },
      data: {
        notionKey: dto.notionKey,
        notionDatabaseId: dto.notionDatabaseId,
        twitterUrl: dto.twitterUrl,
        instagramUrl: dto.instagramUrl,
        githubUrl: dto.githubUrl,
        linkedinUrl: dto.linkedinUrl,
      },
    });
    if (!userInfo || userInfo.userId !== userId)
      throw new ForbiddenException('No permission to update');

    return userInfo;
  }
}
