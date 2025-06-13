import mongoose, { Document, Types } from 'mongoose';
export declare class CheckoutItem extends Document {
    bookId: Types.ObjectId;
    title: string;
    image: string;
    price: number;
    quantity: number;
}
export declare const CheckoutItemSchema: mongoose.Schema<CheckoutItem, mongoose.Model<CheckoutItem, any, any, any, mongoose.Document<unknown, any, CheckoutItem, any> & CheckoutItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CheckoutItem, mongoose.Document<unknown, {}, mongoose.FlatRecord<CheckoutItem>, {}> & mongoose.FlatRecord<CheckoutItem> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class Checkout extends Document {
    userId: Types.ObjectId;
    checkoutItems: Types.DocumentArray<CheckoutItem>;
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
    paymentStatus: string;
    paymentDetails?: any;
    isFinalized: boolean;
    finalizedAt?: Date;
}
export declare const CheckoutSchema: mongoose.Schema<Checkout, mongoose.Model<Checkout, any, any, any, mongoose.Document<unknown, any, Checkout, any> & Checkout & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Checkout, mongoose.Document<unknown, {}, mongoose.FlatRecord<Checkout>, {}> & mongoose.FlatRecord<Checkout> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
