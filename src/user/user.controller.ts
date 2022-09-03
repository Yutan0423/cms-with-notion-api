import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User, UserInfo } from '@prisma/client';
import { Request } from 'express';
import { CreateUserInfoDto } from './dto/create-user-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getLoginUser(@Req() req: Request): Promise<Omit<User, 'password'>> {
    return this.userService.getLoginUser(req.user.id);
  }

  @Get('all')
  getUsers(): Promise<Omit<User[], 'password'>> {
    return this.userService.getUsers();
  }

  @Get('info')
  getUserInfo(@Req() req: Request): Promise<any> {
    return this.userService.getUserInfo(req.user.id);
  }

  @Post('create')
  createUserInfo(
    @Req() req: Request,
    @Body() dto: CreateUserInfoDto,
  ): Promise<UserInfo> {
    return this.userService.createUserInfo(req.user.id, dto);
  }

  @Patch('update')
  updateUserInfo(
    @Req() req: Request,
    @Body() dto: UpdateUserInfoDto,
  ): Promise<any> {
    console.log('----------------------------');
    return this.userService.updateUserInfo(req.user.id, dto);
  }
}
