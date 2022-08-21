import { IsInt, IsNotEmpty } from 'class-validator';

export class GetCmsInfoDto {
  @IsInt()
  @IsNotEmpty()
  cmsUserId: number;
}
