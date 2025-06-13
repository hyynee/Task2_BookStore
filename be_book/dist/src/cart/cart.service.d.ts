import { Model } from 'mongoose';
import { Book } from 'Schemas/book.shema';
import { Cart } from 'Schemas/cart.shema';
import { CreateCartItemDTO } from './dto/create-cart.dto';
export declare class CartService {
    private readonly cartModel;
    private readonly bookModel;
    constructor(cartModel: Model<Cart>, bookModel: Model<Book>);
    addToCart(cartDTO: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart, {}> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    updateCart(cartDTO: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart, {}> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    deleteCartItem(cartDTO: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart, {}> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getCart(cartDTO: {
        userId?: string;
        guestId?: string;
    }): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart, {}> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    mergeCart(cartDTO: CreateCartItemDTO, userId: string): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Cart, {}> & Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    } | {
        status: number;
        message: string;
        data: {
            items: never[];
            totalPrice: number;
        };
    }>;
}
