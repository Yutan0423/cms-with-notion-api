import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCmsSettingDto {
  @IsString()
  @IsNotEmpty()
  settingKey: string;

  @IsString()
  settingValue: string;

  @IsString()
  description: string;
}
