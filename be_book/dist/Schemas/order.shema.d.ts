import { Document, Types } from 'mongoose';
export declare class OrderItem extends Document {
    bookId: Types.ObjectId;
    title: string;
    image: string;
    price: number;
    quantity: number;
}
export declare const OrderItemSchema: import("mongoose").Schema<OrderItem, import("mongoose").Model<OrderItem, any, any, any, Document<unknown, any, OrderItem, any> & OrderItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, OrderItem, Document<unknown, {}, import("mongoose").FlatRecord<OrderItem>, {}> & import("mongoose").FlatRecord<OrderItem> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class Order extends Document {
    userId: Types.ObjectId;
    items: Types.DocumentArray<OrderItem>;
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivery: boolean;
    deliveredAt?: Date;
    paymentStatus: string;
    status: string;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any> & Order & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}> & import("mongoose").FlatRecord<Order> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
