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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const role_guard_1 = require("../middleware/role.guard");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
let BookController = class BookController {
    bookService;
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getAllBooks(author, minReviews, minPrice, maxPrice, sortBy, order = 'asc', page = 1, limit = 10, accessPublic) {
        return await this.bookService.getAllBooks({
            author,
            minPrice,
            maxPrice,
            minReviews,
            sortBy,
            order,
            page,
            limit,
            accessPublic,
        });
    }
    getBestSellerBooks() {
        return this.bookService.getBestSellerBooks();
    }
    getNewArrivalBooks() {
        return this.bookService.getNewArrivalBooks();
    }
    getSimilarBooks(id) {
        return this.bookService.getSimilarBooks(id);
    }
    getBookById(id) {
        return this.bookService.getBookById(id);
    }
    createBook(book) {
        return this.bookService.createBook(book);
    }
    updateBook(book, id) {
        return this.bookService.updateBook(book, id);
    }
    deleteBookById(id) {
        return this.bookService.deleteBookById(id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('author')),
    __param(1, (0, common_1.Query)('minReviews')),
    __param(2, (0, common_1.Query)('minPrice')),
    __param(3, (0, common_1.Query)('maxPrice')),
    __param(4, (0, common_1.Query)('sortBy')),
    __param(5, (0, common_1.Query)('order')),
    __param(6, (0, common_1.Query)('page')),
    __param(7, (0, common_1.Query)('limit')),
    __param(8, (0, common_1.Query)('accessPublic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, String, String, Number, Number, Boolean]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooks", null);
__decorate([
    (0, common_1.Get)('best-seller'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getBestSellerBooks", null);
__decorate([
    (0, common_1.Get)('new-arrivals'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getNewArrivalBooks", null);
__decorate([
    (0, common_1.Get)('similar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getSimilarBooks", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "getBookById", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(new role_guard_1.RolesGuard(['admin'])),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDTO]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "createBook", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(new role_guard_1.RolesGuard(['admin'])),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(200),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_book_dto_1.UpdateBookDTO, String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "updateBook", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(new role_guard_1.RolesGuard(['admin'])),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, common_1.HttpCode)(200),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "deleteBookById", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('books'),
    (0, swagger_1.ApiTags)('Books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map