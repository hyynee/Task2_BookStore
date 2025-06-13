import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ _id: false })
export class CheckoutItem extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Book', required: true })
  bookId: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const CheckoutItemSchema = SchemaFactory.createForClass(CheckoutItem);

@Schema({ timestamps: true })
export class Checkout extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [CheckoutItemSchema], default: [] })
  checkoutItems: Types.DocumentArray<CheckoutItem>;

  @Prop({
    type: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    required: true,
  })
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };

  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ default: false })
  isPaid: boolean;

  @Prop({ type: Date })
  paidAt?: Date;

  @Prop({ type: String, default: 'pending' })
  paymentStatus: string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  paymentDetails?: any;

  @Prop({ default: false })
  isFinalized: boolean;

  @Prop({ type: Date })
  finalizedAt?: Date;
}

export const CheckoutSchema = SchemaFactory.createForClass(Checkout);
