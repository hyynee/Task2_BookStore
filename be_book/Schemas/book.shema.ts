import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Book extends Document {
  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    required: true,
    trim: true,
  })
  author: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    default: false,
  })
  isPublished: boolean;

  @Prop({
    default: 0,
  })
  rating: number;

  @Prop({
    default: 0,
  })
  numReviews: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
