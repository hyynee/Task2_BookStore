import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'Schemas/order.shema';
import { OrderDTO } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async getMyOrders(userId: string) {
    try {
      const orders = await this.orderModel
        .find({ userId: userId })
        .sort({ createdAt: -1 });
      return {
        status: 200,
        message: 'Orders fetched successfully',
        data: orders,
      };
    } catch (err) {
      console.error(err);
    }
  }

  async orDerById(id: string) {
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
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  }

  // Admin
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
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  }

  async updateOrder(id: string, orderDTO: OrderDTO) {
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
      } else {
        return { status: 404, message: 'Order not found' };
      }
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  }

  async deleteOrder(id: string) {
    try {
      const order = await this.orderModel.findByIdAndDelete(id);
      if (order) {
        return {
          status: 200,
          message: 'Order deleted successfully',
        };
      } else {
        return { status: 404, message: 'Order not found' };
      }
    } catch (error) {
      console.error(error);
      throw new Error('Internal server error');
    }
  }
}
