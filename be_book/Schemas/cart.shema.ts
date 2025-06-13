import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class CartItems extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 1 })
  quantity: number;
}

export const CartItemsSchema = SchemaFactory.createForClass(CartItems);

@Schema()
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: Types.ObjectId;

  @Prop({ type: String, required: false })
  guestId?: string;

  @Prop({ type: [CartItemsSchema], default: [] })
  items: Types.DocumentArray<CartItems>;

  @Prop({ type: Number, required: true, default: 0 })
  totalPrice: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
