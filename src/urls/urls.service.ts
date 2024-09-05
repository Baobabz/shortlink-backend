import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UrlDto } from './dto/url.dto';
import { Base62 } from '../util/base62';
import { PrismaService } from 'src/prisma.service';
import { ShortUrlDto } from './dto/short-url.dto';

@Injectable()
export class UrlsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(UrlsService.name);

  async createShortUrl(createUrlDto: UrlDto): Promise<ShortUrlDto> {
    this.logger.log('createShortUrl');
    const { url } = createUrlDto;
    const shortUrl = `https://2sl.me/`;

    const urlExists = await this.prisma.url.findUnique({
      where: {
        url,
      },
    });

    if (urlExists) {
      this.logger.log(`urlExists: ${urlExists.base62}`);
      const newShortUrlDto = new ShortUrlDto();
      newShortUrlDto.srl = shortUrl + urlExists.base62;

      return newShortUrlDto;
    }

    const randomNum = Math.floor(Math.random() * 14776336);
    const base62 = Base62.encode(randomNum);

    const base62Exists = await this.prisma.url.findUnique({
      where: {
        base62,
      },
    });

    if (base62Exists) {
      this.logger.log(`base62Exists: ${base62Exists.base62}`);
      return this.createShortUrl(createUrlDto);
    }

    const newSchema: Prisma.UrlCreateInput = {
      url,
      base62,
      randInt: randomNum,
    };

    await this.prisma.url.create({ data: newSchema });

    const newShortUrlDto = new ShortUrlDto();
    newShortUrlDto.srl = shortUrl + base62;

    return newShortUrlDto;
  }

  async findUrl(base62: string): Promise<UrlDto> {
    this.logger.log('findUrl');
    const urlDto = new UrlDto();

    const url = await this.prisma.url.findUnique({
      where: {
        base62,
      },
    });

    if (!url) {
      throw new NotFoundException();
    }

    this.logger.log(`url: ${url.url}`);
    urlDto.url = url.url;

    return urlDto;
  }
}
