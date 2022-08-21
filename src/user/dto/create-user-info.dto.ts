import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserInfoDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  notionKey: string;

  @IsString()
  @IsNotEmpty()
  notionDatabaseId: string;

  @IsString()
  twitterUrl: string;

  @IsString()
  instagramUrl: string;

  @IsString()
  githubUrl: string;

  @IsString()
  linkedinUrl: string;
}
