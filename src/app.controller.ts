import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('root')
export class AppController {
  constructor(private readonly appService: AppService) {}
}
