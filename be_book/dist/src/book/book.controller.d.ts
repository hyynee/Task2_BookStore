import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    getAllBooks(author?: string, minReviews?: number, minPrice?: number, maxPrice?: number, sortBy?: string, order?: 'asc' | 'desc', page?: number, limit?: number, accessPublic?: boolean): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/book.shema").Book, {}> & import("../../Schemas/book.shema").Book & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getBestSellerBooks(): Promise<import("mongoose").Document<unknown, {}, import("../../Schemas/book.shema").Book, {}> & import("../../Schemas/book.shema").Book & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    getNewArrivalBooks(): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/book.shema").Book, {}> & import("../../Schemas/book.shema").Book & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getSimilarBooks(id: string): Promise<import("../../Schemas/book.shema").Book[]>;
    getBookById(id: string): Promise<import("../../Schemas/book.shema").Book>;
    createBook(book: CreateBookDTO): Promise<{
        statusCode: number;
        message: string;
        book: import("mongoose").Document<unknown, {}, import("../../Schemas/book.shema").Book, {}> & import("../../Schemas/book.shema").Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    updateBook(book: UpdateBookDTO, id: string): Promise<{
        statusCode: number;
        message: string;
        book: (import("mongoose").Document<unknown, {}, import("../../Schemas/book.shema").Book, {}> & import("../../Schemas/book.shema").Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
    deleteBookById(id: string): Promise<{
        statusCode: number;
        message: string;
        book: (import("mongoose").Document<unknown, {}, import("../../Schemas/book.shema").Book, {}> & import("../../Schemas/book.shema").Book & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
}
