import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [PrismaModule],
  controllers: [TodoController],
  providers: [TodoService, PrismaService],
})
export class TodoModule {}
