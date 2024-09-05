import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UrlsModule } from './urls/urls.module';

@Module({
  imports: [UrlsModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [],
  providers: [],
})
export class AppModule {}
