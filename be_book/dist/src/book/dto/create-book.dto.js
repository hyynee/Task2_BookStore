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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBookDTO {
    title;
    author;
    price;
    image;
    description;
    isPublished;
    rating;
    numReviews;
}
exports.CreateBookDTO = CreateBookDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'The title of the book' }),
    __metadata("design:type", String)
], CreateBookDTO.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'The author of the book' }),
    __metadata("design:type", String)
], CreateBookDTO.prototype, "author", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'The price of the book, e.g., "$12.99"' }),
    __metadata("design:type", Number)
], CreateBookDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'The URL of the book cover image' }),
    __metadata("design:type", String)
], CreateBookDTO.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ description: 'A description of the book' }),
    __metadata("design:type", String)
], CreateBookDTO.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: 'Whether the book is published', default: false }),
    __metadata("design:type", Boolean)
], CreateBookDTO.prototype, "isPublished", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({ description: 'The rating of the book', default: 0 }),
    __metadata("design:type", Number)
], CreateBookDTO.prototype, "rating", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)({
        description: 'The number of reviews for the book',
        default: 0,
    }),
    __metadata("design:type", Number)
], CreateBookDTO.prototype, "numReviews", void 0);
//# sourceMappingURL=create-book.dto.js.map