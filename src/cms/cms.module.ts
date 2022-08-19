import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';

@Module({
  imports: [PrismaModule],
  controllers: [CmsController],
  providers: [CmsService, PrismaService],
})
export class CmsModule {}
