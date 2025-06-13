import { Model } from 'mongoose';
import { Book } from 'Schemas/book.shema';
import { Cart } from 'Schemas/cart.shema';
import { Checkout } from 'Schemas/checkout.shema';
import { Order } from 'Schemas/order.shema';
import { CheckoutDTO, CreateCheckoutDTO } from './dto/create-checkout.dto';
export declare class CheckoutService {
    private readonly checkoutModel;
    private readonly cartModel;
    private readonly bookModel;
    private readonly orderModel;
    constructor(checkoutModel: Model<Checkout>, cartModel: Model<Cart>, bookModel: Model<Book>, orderModel: Model<Order>);
    checkout(checkoutDTO: CreateCheckoutDTO, userId: string): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, Checkout, {}> & Checkout & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    payCheckout(checkoutDTO: CheckoutDTO, id: string): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, Checkout, {}> & Checkout & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    finalizeCheckout(id: string): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, Checkout, {}> & Checkout & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    } | {
        status: number;
        message: string;
        checkout?: undefined;
    }>;
}
