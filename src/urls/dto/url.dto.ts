import { ApiProperty } from '@nestjs/swagger';

export class UrlDto {
  @ApiProperty({
    description: 'The url to be shortened',
    example: 'https://www.google.com',
  })
  url: string;
}
