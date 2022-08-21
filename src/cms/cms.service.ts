import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CmsSetting, prisma, UserInfo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCmsSettingDto } from './dto/update-cms-setting.dto';

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

  getCmsUserId(): Promise<Pick<CmsSetting, 'settingValue'>> {
    const cmsUserId = this.prisma.cmsSetting.findFirst({
      where: {
        settingKey: 'cmsUserId',
      },
      select: {
        settingValue: true,
      },
    });
    if (!cmsUserId) throw new NotFoundException('Page is not Found');

    return cmsUserId;
  }

  getCmsInfo(cmsUserId: number): Promise<any> {
    const cmsInfo = this.prisma.userInfo.findFirst({
      where: {
        userId: cmsUserId,
      },
      select: {
        notionKey: true,
        notionDatabaseId: true,
        twitterUrl: true,
        instagramUrl: true,
        githubUrl: true,
        linkedinUrl: true,
      },
    });

    return cmsInfo;
  }

  async updateCmsSetting(dto: UpdateCmsSettingDto): Promise<any> {
    const cmsSetting = await this.prisma.cmsSetting.updateMany({
      where: {
        settingKey: 'setUserId',
      },
      data: {
        settingValue: dto.userId.toString(),
      },
    });

    if (!cmsSetting) throw new ForbiddenException('No permission to update.');

    return cmsSetting;
  }
}
