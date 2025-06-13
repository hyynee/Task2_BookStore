"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const database_module_1 = require("../config/database.module");
const multer = require("multer");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const book_module_1 = require("./book/book.module");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const upload_1 = require("./uploadImage/upload");
const user_module_1 = require("./user/user.module");
const cart_module_1 = require("./cart/cart.module");
const order_module_1 = require("./order/order.module");
const checkout_module_1 = require("./checkout/checkout.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            platform_express_1.MulterModule.register({
                storage: multer.memoryStorage(),
            }),
            user_module_1.UserModule,
            book_module_1.BookModule,
            cart_module_1.CartModule,
            order_module_1.OrderModule,
            checkout_module_1.CheckoutModule,
        ],
        controllers: [app_controller_1.AppController, upload_1.UploadController],
        providers: [app_service_1.AppService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map