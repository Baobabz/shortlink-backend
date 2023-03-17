import { Injectable } from '@nestjs/common';
import { UrlDto } from './dto/url.dto';
import { Base62 } from '../util/base62';

@Injectable()
export class UrlsService {
  async createShortUrl(createUrlDto: UrlDto): Promise<string> {
    const { url } = createUrlDto;
    const shortUrl = `https://2sl.me/`;
    const randomNum = Math.floor(Math.random() * 56800235584);

    const base62 = Base62.encode(randomNum);
    return Promise.resolve(shortUrl.concat(base62));
  }

  async findUrl(shortUrl: string): Promise<string> {
    return Promise.resolve(shortUrl + 'abc123');
  }
}
