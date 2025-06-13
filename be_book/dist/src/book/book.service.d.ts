import { Model } from 'mongoose';
import { Book } from 'Schemas/book.shema';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
export declare class BookService {
    private readonly bookModel;
    constructor(bookModel: Model<Book>);
    getAllBooks(filters: any): Promise<(import("mongoose").Document<unknown, {}, Book, {}> & Book & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getBookById(id: string): Promise<Book>;
    getSimilarBooks(id: string): Promise<Book[]>;
    getBestSellerBooks(): Promise<import("mongoose").Document<unknown, {}, Book, {}> & Book & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getNewArrivalBooks(): Promise<(import("mongoose").Document<unknown, {}, Book, {}> & Book & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    createBook(book: CreateBookDTO): Promise<{
        statusCode: number;
        message: string;
        book: import("mongoose").Document<unknown, {}, Book, {}> & Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    updateBook(book: UpdateBookDTO, id: string): Promise<{
        statusCode: number;
        message: string;
        book: (import("mongoose").Document<unknown, {}, Book, {}> & Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    deleteBookById(id: string): Promise<{
        statusCode: number;
        message: string;
        book: (import("mongoose").Document<unknown, {}, Book, {}> & Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
}
