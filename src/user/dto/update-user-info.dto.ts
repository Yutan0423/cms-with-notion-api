import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserInfoDto {
  @IsString()
  @IsNotEmpty()
  nickName: string;

  @IsString()
  @IsNotEmpty()
  notionKey: string;

  @IsString()
  @IsNotEmpty()
  notionDatabaseId: string;
}
