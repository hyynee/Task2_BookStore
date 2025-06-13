import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

// DTO cho OrderItem
export class OrderItemDTO {
  @IsNotEmpty()
  @IsMongoId()
  bookId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class ShippingAddressDTO {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  postalCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

export class OrderDTO {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDTO)
  shippingAddress: ShippingAddressDTO;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  @IsBoolean()
  isPaid?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  paidAt?: Date;

  @IsOptional()
  @IsBoolean()
  isDelivered?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  deliveredAt?: Date;

  @IsOptional()
  @IsString()
  paymentStatus?: string;

  @IsOptional()
  @IsEnum(['Processing', 'Shipped', 'Delivered', 'Cancelled'])
  status?: string;
}

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => ShippingAddressDTO)
  shippingAddress: ShippingAddressDTO;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}