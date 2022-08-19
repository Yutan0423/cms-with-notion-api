import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CmsSetting } from '@prisma/client';
import { CmsService } from './cms.service';
import { UpdateCmsSettingDto } from './dto/update-cms-setting.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Patch('update')
  updateUserInfo(@Body() dto: UpdateCmsSettingDto): Promise<any> {
    return this.cmsService.updateCmsSetting(dto);
  }
}
