import { Types } from 'mongoose';
export declare class CreateCartItemDTO {
    bookId: Types.ObjectId;
    quantity: number;
    price: number;
    guestId?: Types.ObjectId;
    userId?: Types.ObjectId;
}
