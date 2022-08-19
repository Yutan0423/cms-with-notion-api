import { ForbiddenException, Injectable } from '@nestjs/common';
import { CmsSetting } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateCmsSettingDto } from './dto/update-cms-setting.dto';

@Injectable()
export class CmsService {
  constructor(private readonly prisma: PrismaService) {}

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
