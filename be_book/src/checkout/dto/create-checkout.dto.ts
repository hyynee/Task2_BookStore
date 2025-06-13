import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CheckoutItemDTO {
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

export class CheckoutDTO {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDTO)
  checkoutItems: CheckoutItemDTO[];

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
  @IsString()
  paymentStatus?: string;

  @IsOptional()
  @IsObject()
  paymentDetails?: any;

  @IsOptional()
  @IsBoolean()
  isFinalized?: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  finalizedAt?: Date;
}

export class CreateCheckoutDTO {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItemDTO)
  checkoutItems: CheckoutItemDTO[];

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
