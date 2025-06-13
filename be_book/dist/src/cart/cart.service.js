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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const book_shema_1 = require("../../Schemas/book.shema");
const cart_shema_1 = require("../../Schemas/cart.shema");
let CartService = class CartService {
    cartModel;
    bookModel;
    constructor(cartModel, bookModel) {
        this.cartModel = cartModel;
        this.bookModel = bookModel;
    }
    async addToCart(cartDTO) {
        const { bookId, quantity, price, guestId, userId } = cartDTO;
        const book = await this.bookModel.findById(bookId);
        if (!book) {
            throw new common_1.HttpException('Book not found', common_1.HttpStatus.NOT_FOUND);
        }
        const query = userId
            ? { user: new mongoose_2.Types.ObjectId(userId) }
            : { guestId: guestId || `guest_${new Date().getTime()}` };
        let cart = await this.cartModel.findOne(query).exec();
        if (cart) {
            const bookIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId.toString());
            if (bookIndex > -1) {
                cart.items[bookIndex].quantity += quantity;
            }
            else {
                cart.items.push({
                    bookId,
                    quantity,
                    price: book.price,
                    title: book.title,
                    image: book.image,
                });
            }
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
        }
        else {
            cart = await this.cartModel.create({
                user: userId ? new mongoose_2.Types.ObjectId(userId) : undefined,
                guestId: guestId || `guest_${new Date().getTime()}`,
                items: [
                    {
                        bookId,
                        quantity,
                        price: book.price,
                        title: book.title,
                        image: book.image,
                    },
                ],
                totalPrice: book.price * quantity,
            });
        }
        return {
            status: 200,
            message: cart ? 'Book updated in cart' : 'Book added to cart',
            data: cart,
        };
    }
    async updateCart(cartDTO) {
        const { bookId, quantity, guestId, userId } = cartDTO;
        try {
            const query = userId ? { user: new mongoose_2.Types.ObjectId(userId) } : { guestId };
            let cart = await this.cartModel.findOne(query);
            if (!cart) {
                throw new common_1.HttpException('Cart not found', common_1.HttpStatus.NOT_FOUND);
            }
            const bookIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId.toString());
            if (bookIndex > -1) {
                if (quantity > 0) {
                    cart.items[bookIndex].quantity = quantity;
                }
                else {
                    cart.items.splice(bookIndex, 1);
                }
            }
            cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            return {
                status: 200,
                message: 'Book updated in cart',
                data: cart,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteCartItem(cartDTO) {
        const { bookId, guestId, userId } = cartDTO;
        try {
            const query = userId ? { user: new mongoose_2.Types.ObjectId(userId) } : { guestId };
            let cart = await this.cartModel.findOne(query);
            if (!cart) {
                throw new common_1.HttpException('Cart not found', common_1.HttpStatus.NOT_FOUND);
            }
            const bookIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId.toString());
            if (bookIndex > -1) {
                cart.items.splice(bookIndex, 1);
                cart.totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
            }
            await cart.save();
            return {
                status: 200,
                message: 'Book removed from cart',
                data: cart,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCart(cartDTO) {
        const { guestId, userId } = cartDTO;
        const query = userId ? { user: new mongoose_2.Types.ObjectId(userId) } : { guestId };
        try {
            const cart = await this.cartModel.findOne(query).exec();
            if (cart) {
                return {
                    status: 200,
                    message: 'Cart retrieved successfully',
                    data: cart,
                };
            }
            else {
                throw new common_1.HttpException('Cart not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async mergeCart(cartDTO, userId) {
        const { guestId, bookId, quantity, price } = cartDTO;
        try {
            const book = await this.bookModel.findById(bookId);
            if (!book) {
                throw new common_1.HttpException('Book not found', common_1.HttpStatus.BAD_REQUEST);
            }
            const guestCart = await this.cartModel.findOne({ guestId });
            const userCart = await this.cartModel.findOne({
                user: new mongoose_2.Types.ObjectId(userId),
            });
            if (!guestCart) {
                if (userCart) {
                    return {
                        status: 200,
                        message: 'Guest cart has already been merged, returning user cart',
                        data: userCart,
                    };
                }
                return {
                    status: 200,
                    message: 'No guest cart, returning empty cart',
                    data: { items: [], totalPrice: 0 },
                };
            }
            if (guestCart.items.length === 0) {
                throw new common_1.HttpException('Guest cart is empty', common_1.HttpStatus.NOT_FOUND);
            }
            if (userCart) {
                for (const guestItem of guestCart.items) {
                    const book = await this.bookModel.findById(guestItem.bookId);
                    if (!book)
                        continue;
                    const bookIndex = userCart.items.findIndex((item) => item.bookId.toString() === guestItem.bookId.toString());
                    if (bookIndex > -1) {
                        userCart.items[bookIndex].quantity += guestItem.quantity;
                    }
                    else {
                        userCart.items.push({
                            bookId: guestItem.bookId,
                            title: book.title,
                            image: book.image,
                            price: book.price,
                            quantity: guestItem.quantity,
                        });
                    }
                }
                userCart.totalPrice = userCart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
                await userCart.save();
                await this.cartModel.findOneAndDelete({ guestId });
                return {
                    status: 200,
                    message: 'Cart merged successfully',
                    data: userCart,
                };
            }
            else {
                if (!userId) {
                    throw new common_1.HttpException('User ID is required to assign guest cart', common_1.HttpStatus.BAD_REQUEST);
                }
                guestCart.user = new mongoose_2.Types.ObjectId(userId);
                guestCart.guestId = undefined;
                await guestCart.save();
                return {
                    status: 200,
                    message: 'Guest cart assigned to user successfully',
                    data: guestCart,
                };
            }
        }
        catch (err) {
            throw new common_1.HttpException(err.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_shema_1.Cart.name)),
    __param(1, (0, mongoose_1.InjectModel)(book_shema_1.Book.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map