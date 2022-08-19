import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCmsSettingDto {
  @IsString()
  @IsNotEmpty()
  userId: number;
}
