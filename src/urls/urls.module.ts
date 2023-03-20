import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [UrlsController],
  providers: [UrlsService, PrismaService],
})
export class UrlsModule {}
