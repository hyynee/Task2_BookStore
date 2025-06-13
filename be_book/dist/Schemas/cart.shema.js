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
exports.CartSchema = exports.Cart = exports.CartItemsSchema = exports.CartItems = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CartItems = class CartItems extends mongoose_2.Document {
    bookId;
    title;
    image;
    price;
    quantity;
};
exports.CartItems = CartItems;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Book', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CartItems.prototype, "bookId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CartItems.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], CartItems.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], CartItems.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 1 }),
    __metadata("design:type", Number)
], CartItems.prototype, "quantity", void 0);
exports.CartItems = CartItems = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], CartItems);
exports.CartItemsSchema = mongoose_1.SchemaFactory.createForClass(CartItems);
let Cart = class Cart extends mongoose_2.Document {
    user;
    guestId;
    items;
    totalPrice;
};
exports.Cart = Cart;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Cart.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], Cart.prototype, "guestId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.CartItemsSchema], default: [] }),
    __metadata("design:type", mongoose_2.Types.DocumentArray)
], Cart.prototype, "items", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true, default: 0 }),
    __metadata("design:type", Number)
], Cart.prototype, "totalPrice", void 0);
exports.Cart = Cart = __decorate([
    (0, mongoose_1.Schema)()
], Cart);
exports.CartSchema = mongoose_1.SchemaFactory.createForClass(Cart);
//# sourceMappingURL=cart.shema.js.map