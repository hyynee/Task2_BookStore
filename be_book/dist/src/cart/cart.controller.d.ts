import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cart.dto';
export declare class CartController {
    private readonly cartService;
    constructor(cartService: CartService);
    getCart(userId: string, guestId: string): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.shema").Cart, {}> & import("../../Schemas/cart.shema").Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    addToCart(cartItem: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.shema").Cart, {}> & import("../../Schemas/cart.shema").Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    mergeCart(cartItem: CreateCartItemDTO, curuserId: any): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.shema").Cart, {}> & import("../../Schemas/cart.shema").Cart & Required<{
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
    updateCart(cartItem: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.shema").Cart, {}> & import("../../Schemas/cart.shema").Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    deleteCartItem(cartItem: CreateCartItemDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/cart.shema").Cart, {}> & import("../../Schemas/cart.shema").Cart & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
