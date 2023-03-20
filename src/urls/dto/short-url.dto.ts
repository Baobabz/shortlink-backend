import { ApiProperty } from '@nestjs/swagger';

export class ShortUrlDto {
  @ApiProperty({
    description: 'The shortened url',
    example: 'https://2sl.me/abc123',
  })
  srl: string;
}
