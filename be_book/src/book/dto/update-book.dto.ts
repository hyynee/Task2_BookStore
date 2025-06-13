import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateBookDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The title of the book', required: false })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'The author of the book', required: false })
  author: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The price of the book, e.g., "$12.99"',
    required: false,
  })
  price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The URL of the book cover image',
    required: false,
  })
  image: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'A description of the book', required: false })
  description: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Whether the book is published',
    required: false,
  })
  isPublished: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ description: 'The rating of the book', required: false })
  rating: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'The number of reviews for the book',
    required: false,
  })
  numReviews: number;
}
