"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const book_shema_1 = require("../../Schemas/book.shema");
const cart_shema_1 = require("../../Schemas/cart.shema");
const checkout_shema_1 = require("../../Schemas/checkout.shema");
const order_shema_1 = require("../../Schemas/order.shema");
const checkout_controller_1 = require("./checkout.controller");
const checkout_service_1 = require("./checkout.service");
let CheckoutModule = class CheckoutModule {
};
exports.CheckoutModule = CheckoutModule;
exports.CheckoutModule = CheckoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: checkout_shema_1.Checkout.name, schema: checkout_shema_1.CheckoutSchema },
                { name: order_shema_1.Order.name, schema: order_shema_1.OrderSchema },
                { name: cart_shema_1.Cart.name, schema: cart_shema_1.CartSchema },
                { name: book_shema_1.Book.name, schema: book_shema_1.BookSchema },
            ]),
        ],
        controllers: [checkout_controller_1.CheckoutController],
        providers: [checkout_service_1.CheckoutService],
    })
], CheckoutModule);
//# sourceMappingURL=checkout.module.js.map