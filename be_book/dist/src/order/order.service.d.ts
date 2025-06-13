import { Model } from 'mongoose';
import { Order } from 'Schemas/order.shema';
import { OrderDTO } from './dto/create-order.dto';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<Order>);
    getMyOrders(userId: string): Promise<{
        status: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | undefined>;
    orDerById(id: string): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    getAllOrders(): Promise<{
        status: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    updateOrder(id: string, orderDTO: OrderDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, Order, {}> & Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    } | {
        status: number;
        message: string;
        data?: undefined;
    }>;
    deleteOrder(id: string): Promise<{
        status: number;
        message: string;
    }>;
}
