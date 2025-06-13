import { Document } from 'mongoose';
export declare class Book extends Document {
    title: string;
    author: string;
    price: number;
    image: string;
    description: string;
    isPublished: boolean;
    rating: number;
    numReviews: number;
}
export declare const BookSchema: import("mongoose").Schema<Book, import("mongoose").Model<Book, any, any, any, Document<unknown, any, Book, any> & Book & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Book, Document<unknown, {}, import("mongoose").FlatRecord<Book>, {}> & import("mongoose").FlatRecord<Book> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
