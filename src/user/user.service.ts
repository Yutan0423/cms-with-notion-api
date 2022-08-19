import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserInfo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
            nickName: true,
            notionKey: true,
            notionDatabaseId: true,
          },
        },
      },
    });

    return userInfo;
  }

  async createUserInfo(
    userId: number,
    dto: CreateUserInfoDto,
  ): Promise<UserInfo> {
    const userInfo = await this.prisma.userInfo.create({
      data: {
        userId,
        ...dto,
      },
    });

    return userInfo;
  }

  async updateUserInfo(userId: number, dto: UpdateUserInfoDto): Promise<any> {
    const userInfo = await this.prisma.userInfo.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });
    if (!userInfo || userInfo.userId !== userId)
      throw new ForbiddenException('No permission to update.');

    return userInfo;
  }
}
