import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UrlDto } from './dto/url.dto';
import { UrlsService } from './urls.service';
import { ShortUrlDto } from './dto/short-url.dto';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('urls')
@Controller({
  version: '1',
  path: 'urls',
})
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}
  @ApiTags('test')
  @ApiProperty({
    description: 'The shortened url',
    example: 'https://2sl.me/abc123',
  })
  @Get()
  findAll(): string {
    return 'This is a test';
  }

  @ApiOperation({ summary: 'Create a short url' })
  @ApiResponse({
    status: 201,
    description: 'The short url has been successfully created.',
    type: ShortUrlDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @Post()
  createShortUrl(@Body() createUrlDto: UrlDto): Promise<ShortUrlDto> {
    return this.urlsService.createShortUrl(createUrlDto);
  }

  @ApiOperation({ summary: 'Find a url' })
  @ApiResponse({
    status: 200,
    description: 'The url has been successfully found.',
    type: UrlDto,
  })
  @ApiResponse({ status: 404, description: 'Url not found.' })
  @Get(':shortUrl')
  findUrl(@Param('shortUrl') shortUrl: string): Promise<UrlDto> {
    return this.urlsService.findUrl(shortUrl);
  }
}
