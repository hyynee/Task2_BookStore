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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_shema_1 = require("../../Schemas/order.shema");
let OrderService = class OrderService {
    orderModel;
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async getMyOrders(userId) {
        try {
            const orders = await this.orderModel
                .find({ userId: userId })
                .sort({ createdAt: -1 });
            return {
                status: 200,
                message: 'Orders fetched successfully',
                data: orders,
            };
        }
        catch (err) {
            console.error(err);
        }
    }
    async orDerById(id) {
        try {
            const order = await this.orderModel
                .findById(id)
                .populate('userId', 'name email');
            if (!order) {
                return { status: 404, message: 'Order not found' };
            }
            return {
                status: 200,
                message: 'Order fetched successfully',
                data: order,
            };
        }
        catch (err) {
            console.error(err);
            throw new Error('Internal server error');
        }
    }
    async getAllOrders() {
        try {
            const allOrders = await this.orderModel
                .find()
                .sort({ createdAt: -1 })
                .populate('userId', 'name');
            return {
                status: 200,
                message: 'Orders fetched successfully',
                data: allOrders,
            };
        }
        catch (err) {
            console.error(err);
            throw new Error('Internal server error');
        }
    }
    async updateOrder(id, orderDTO) {
        try {
            const getOrder = await this.orderModel.findById(id);
            if (getOrder) {
                getOrder.status = orderDTO.status || getOrder.status;
                getOrder.isDelivery =
                    orderDTO.status === 'Delivered' ? true : getOrder.isDelivery;
                getOrder.deliveredAt =
                    orderDTO.status === 'Delivered'
                        ? new Date(Date.now())
                        : getOrder.deliveredAt;
                const updatedOrder = await getOrder.save();
                return {
                    status: 200,
                    message: 'Order updated successfully',
                    data: updatedOrder,
                };
            }
            else {
                return { status: 404, message: 'Order not found' };
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Internal server error');
        }
    }
    async deleteOrder(id) {
        try {
            const order = await this.orderModel.findByIdAndDelete(id);
            if (order) {
                return {
                    status: 200,
                    message: 'Order deleted successfully',
                };
            }
            else {
                return { status: 404, message: 'Order not found' };
            }
        }
        catch (error) {
            console.error(error);
            throw new Error('Internal server error');
        }
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_shema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map