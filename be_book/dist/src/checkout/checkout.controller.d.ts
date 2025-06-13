import { CheckoutService } from './checkout.service';
import { CheckoutDTO, CreateCheckoutDTO } from './dto/create-checkout.dto';
export declare class CheckoutController {
    private readonly checkoutService;
    constructor(checkoutService: CheckoutService);
    checkout(checkout: CreateCheckoutDTO, curUserId: any): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, import("../../Schemas/checkout.shema").Checkout, {}> & import("../../Schemas/checkout.shema").Checkout & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    payCheckout(checkout: CheckoutDTO, id: string): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, import("../../Schemas/checkout.shema").Checkout, {}> & import("../../Schemas/checkout.shema").Checkout & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    finalizeCheckout(id: string): Promise<{
        status: number;
        message: string;
        checkout: import("mongoose").Document<unknown, {}, import("../../Schemas/checkout.shema").Checkout, {}> & import("../../Schemas/checkout.shema").Checkout & Required<{
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
