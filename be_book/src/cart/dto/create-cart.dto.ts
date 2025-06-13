import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCartItemDTO {
  @ApiProperty()
  bookId: Types.ObjectId;

  @IsNumber()
  @ApiProperty()
  quantity: number;

  @IsNumber()
  @ApiProperty()
  price: number;

  @ApiProperty()
  guestId?: Types.ObjectId;

  @ApiProperty()
  userId?: Types.ObjectId;
}
