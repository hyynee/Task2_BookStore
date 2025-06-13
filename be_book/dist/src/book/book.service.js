"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const book_shema_1 = require("../../Schemas/book.shema");
let BookService = class BookService {
    bookModel;
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async getAllBooks(filters) {
        const query = {};
        if (filters.author)
            query.author = { $regex: filters.author, $options: 'i' };
        if (filters.minPrice !== undefined)
            query.price = { $gte: parseFloat(filters.minPrice.replace('$', '')) };
        if (filters.maxPrice !== undefined) {
            query.price = query.price || {};
            query.price.$lte = parseFloat(filters.maxPrice.replace('$', ''));
        }
        if (filters.minReviews !== undefined)
            query.numReviews = { $gte: filters.minReviews };
        if (filters.accessPublic)
            query.isPublished = true;
        let sortOptions = {};
        if (filters.sortBy) {
            if (filters.sortBy === 'priceAsc') {
                sortOptions.price = 1;
            }
            else if (filters.sortBy === 'priceDesc') {
                sortOptions.price = -1;
            }
            else if (filters.sortBy === 'popularity') {
                sortOptions.rating = -1;
            }
            else {
                sortOptions[filters.sortBy] = filters.order === 'desc' ? -1 : 1;
            }
        }
        const page = Math.max(1, filters.page || 1);
        const limit = Math.max(1, filters.limit || 10);
        const skip = (page - 1) * limit;
        return await this.bookModel
            .find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .exec();
    }
    async getBookById(id) {
        try {
            const book = await this.bookModel.findById(id);
            if (!book) {
                throw new common_1.HttpException({
                    statusCode: 404,
                    message: `Book with ID ${id} not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return book;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSimilarBooks(id) {
        try {
            const book = await this.bookModel.findById(id);
            if (!book) {
                throw new common_1.HttpException({
                    statusCode: 404,
                    message: `Book with ID ${id} not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            const similarBooks = await this.bookModel
                .find({
                _id: { $ne: id },
                author: book.author,
            })
                .limit(4);
            return similarBooks;
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBestSellerBooks() {
        try {
            const bestseller = await this.bookModel.findOne().sort({
                rating: -1,
            });
            if (bestseller) {
                return bestseller;
            }
            else {
                throw new common_1.HttpException({
                    statusCode: 404,
                    message: `No BestSeller Book not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getNewArrivalBooks() {
        try {
            if (!this.bookModel) {
                throw new Error('Book model is not initialized');
            }
            console.log('Starting getNewArrivalBooks...');
            const newArrivalBooks = await this.bookModel
                .find()
                .sort({
                createdAt: -1,
            })
                .limit(8);
            console.log('Found books:', newArrivalBooks.length);
            return newArrivalBooks;
        }
        catch (error) {
            console.error('Error in getNewArrivalBooks:', error);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createBook(book) {
        const createdBook = new this.bookModel(book);
        return {
            statusCode: 200,
            message: 'Create success',
            book: await createdBook.save(),
        };
    }
    async updateBook(book, id) {
        const existingBook = await this.bookModel.findById(id);
        if (!existingBook) {
            throw new common_1.HttpException({
                statusCode: 404,
                message: `Book with ID ${id} not found`,
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const updateData = {};
        Object.keys(book).forEach((key) => {
            if (book[key] !== undefined && book[key] !== null && book[key] !== '') {
                updateData[key] = book[key];
            }
        });
        return {
            statusCode: 200,
            message: 'Update success',
            book: await this.bookModel.findByIdAndUpdate(id, updateData, {
                new: true,
            }),
        };
    }
    async deleteBookById(id) {
        try {
            const existBook = await this.bookModel.findById(id);
            if (!existBook) {
                throw new common_1.HttpException({
                    statusCode: 404,
                    message: `Book with ID ${id} not found`,
                }, common_1.HttpStatus.NOT_FOUND);
            }
            return {
                statusCode: 200,
                message: 'Delete success',
                book: await this.bookModel.findByIdAndDelete(id),
            };
        }
        catch (error) {
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(book_shema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BookService);
//# sourceMappingURL=book.service.js.map