import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'Schemas/book.shema';
import { Cart } from 'Schemas/cart.shema';
import { Checkout } from 'Schemas/checkout.shema';
import { Order } from 'Schemas/order.shema';
import { CheckoutDTO, CreateCheckoutDTO } from './dto/create-checkout.dto';

@Injectable()
export class CheckoutService {
  constructor(
    @InjectModel(Checkout.name) private readonly checkoutModel: Model<Checkout>,
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
  ) {}

  async checkout(checkoutDTO: CreateCheckoutDTO, userId: string) {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
      checkoutDTO;

    if (!checkoutItems || checkoutItems.length === 0) {
      throw new HttpException('No items in checkout', HttpStatus.NOT_FOUND);
    }

    // Validate books existence and availability
    for (const item of checkoutItems) {
      const book = await this.bookModel.findById(item.bookId);
      if (!book) {
        throw new HttpException(
          `Book with ID ${item.bookId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (!book.isPublished) {
        throw new HttpException(
          `Book ${item.title} is not published`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    try {
      const newCheckout = await this.checkoutModel.create({
        userId: userId,
        checkoutItems: checkoutItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        paymentStatus: 'pending',
        isPaid: false,
      });
      console.log('Checkout created for user: ', userId);
      return {
        status: 200,
        message: 'Checkout successful',
        checkout: newCheckout,
      };
    } catch (error) {
      throw new HttpException('Checkout failed', HttpStatus.BAD_REQUEST);
    }
  }

  async payCheckout(checkoutDTO: CheckoutDTO, id: string) {
    const { paymentStatus, paymentDetails } = checkoutDTO;
    try {
      const checkout = await this.checkoutModel.findById(id);
      if (!checkout) {
        throw new HttpException('Checkout not found', HttpStatus.NOT_FOUND);
      }
      if (paymentStatus === 'paid') {
        checkout.isPaid = true;
        checkout.paymentStatus = paymentStatus;
        checkout.paymentDetails = paymentDetails;
        checkout.paidAt = new Date();
        await checkout.save();
        return {
          status: 200,
          message: 'Payment successful',
          checkout: checkout,
        };
      } else {
        throw new HttpException(
          'Invalid payment status',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException('Payment failed', HttpStatus.BAD_REQUEST);
    }
  }

  async finalizeCheckout(id: string) {
    try {
      const checkout = await this.checkoutModel.findById(id);
      if (!checkout) {
        throw new HttpException('Checkout not found', HttpStatus.NOT_FOUND);
      }
      if (checkout.isPaid && !checkout.isFinalized) {
        // Create final order
        const finalOrder = await this.orderModel.create({
          userId: checkout.userId,
          items: checkout.checkoutItems,
          shippingAddress: checkout.shippingAddress,
          paymentMethod: checkout.paymentMethod,
          totalPrice: checkout.totalPrice,
          isPaid: true,
          paidAt: checkout.paidAt,
          isDelivery: false,
          paymentStatus: 'paid',
          status: 'Processing',
        });
        // Mark the checkout as finalized
        checkout.isFinalized = true;
        checkout.finalizedAt = new Date();
        await checkout.save();
        // Delete cart
        await this.cartModel.findOneAndDelete({
          user: checkout.userId,
        });
        return {
          status: 200,
          message: 'Finalize successful',
          checkout: checkout,
        };
      } else if (checkout.isFinalized) {
        return {
          status: 400,
          message: 'Checkout is already finalized',
        };
      } else {
        throw new HttpException('Checkout not paid', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      console.error('Finalize error:', error);
      throw new HttpException('Finalize failed', HttpStatus.BAD_REQUEST);
    }
  }
}
