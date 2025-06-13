import { OrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAllOrders(): Promise<{
        status: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../../Schemas/order.shema").Order, {}> & import("../../Schemas/order.shema").Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    }>;
    updateOrder(id: string, orderDTO: OrderDTO): Promise<{
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/order.shema").Order, {}> & import("../../Schemas/order.shema").Order & Required<{
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
    getMyOrders(data: any): Promise<{
        status: number;
        message: string;
        data: (import("mongoose").Document<unknown, {}, import("../../Schemas/order.shema").Order, {}> & import("../../Schemas/order.shema").Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
    } | undefined>;
    getById(id: string): Promise<{
        status: number;
        message: string;
        data?: undefined;
    } | {
        status: number;
        message: string;
        data: import("mongoose").Document<unknown, {}, import("../../Schemas/order.shema").Order, {}> & import("../../Schemas/order.shema").Order & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
