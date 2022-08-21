import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CmsSetting, UserInfo } from '@prisma/client';
import { CmsService } from './cms.service';
import { GetCmsInfoDto } from './dto/get-cms-info.dto';
import { UpdateCmsSettingDto } from './dto/update-cms-setting.dto';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Get('user')
  getCmsUserId(): Promise<Pick<CmsSetting, 'settingValue'>> {
    return this.cmsService.getCmsUserId();
  }

  @Get('info')
  getCmsInfo(@Body() dto: GetCmsInfoDto): Promise<any> {
    return this.cmsService.getCmsInfo(dto.cmsUserId);
  }

  @Patch('update')
  updateCmsSetting(@Body() dto: UpdateCmsSettingDto): Promise<any> {
    return this.cmsService.updateCmsSetting(dto);
  }
}
