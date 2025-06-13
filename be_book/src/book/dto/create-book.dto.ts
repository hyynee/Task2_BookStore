import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @ApiProperty({ description: 'The title of the book' })
  title: string;

  @IsString()
  @ApiProperty({ description: 'The author of the book' })
  author: string;

  @IsString()
  @ApiProperty({ description: 'The price of the book, e.g., "$12.99"' })
  price: number;

  @IsString()
  @ApiProperty({ description: 'The URL of the book cover image' })
  image: string;

  @IsString()
  @ApiProperty({ description: 'A description of the book' })
  description: string;

  @IsBoolean()
  @ApiProperty({ description: 'Whether the book is published', default: false })
  isPublished: boolean;

  @IsNumber()
  @ApiProperty({ description: 'The rating of the book', default: 0 })
  rating: number;

  @IsNumber()
  @ApiProperty({
    description: 'The number of reviews for the book',
    default: 0,
  })
  numReviews: number;
}
