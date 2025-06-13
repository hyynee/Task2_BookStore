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
exports.CheckoutSchema = exports.Checkout = exports.CheckoutItemSchema = exports.CheckoutItem = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CheckoutItem = class CheckoutItem extends mongoose_2.Document {
    bookId;
    title;
    image;
    price;
    quantity;
};
exports.CheckoutItem = CheckoutItem;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Book', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], CheckoutItem.prototype, "bookId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CheckoutItem.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CheckoutItem.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], CheckoutItem.prototype, "price", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], CheckoutItem.prototype, "quantity", void 0);
exports.CheckoutItem = CheckoutItem = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], CheckoutItem);
exports.CheckoutItemSchema = mongoose_1.SchemaFactory.createForClass(CheckoutItem);
let Checkout = class Checkout extends mongoose_2.Document {
    userId;
    checkoutItems;
    shippingAddress;
    paymentMethod;
    totalPrice;
    isPaid;
    paidAt;
    paymentStatus;
    paymentDetails;
    isFinalized;
    finalizedAt;
};
exports.Checkout = Checkout;
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Checkout.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [exports.CheckoutItemSchema], default: [] }),
    __metadata("design:type", mongoose_2.Types.DocumentArray)
], Checkout.prototype, "checkoutItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        required: true,
    }),
    __metadata("design:type", Object)
], Checkout.prototype, "shippingAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], Checkout.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], Checkout.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Checkout.prototype, "isPaid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Checkout.prototype, "paidAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'pending' }),
    __metadata("design:type", String)
], Checkout.prototype, "paymentStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], Checkout.prototype, "paymentDetails", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Checkout.prototype, "isFinalized", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Checkout.prototype, "finalizedAt", void 0);
exports.Checkout = Checkout = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Checkout);
exports.CheckoutSchema = mongoose_1.SchemaFactory.createForClass(Checkout);
//# sourceMappingURL=checkout.shema.js.map