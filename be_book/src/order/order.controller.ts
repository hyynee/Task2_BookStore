import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/middleware/role.guard';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
import { OrderDTO } from './dto/create-order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Admin: Lấy tất cả đơn hàng
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['admin']))
  @Get('/all')
  getAllOrders() {
    return this.orderService.getAllOrders();
  }

  // Admin: Cập nhật đơn hàng
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['admin']))
  @Put('/update/:id')
  updateOrder(@Param('id') id: string, @Body() orderDTO: OrderDTO) {
    return this.orderService.updateOrder(id, orderDTO);
  }

  // Admin: Xóa đơn hàng
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['admin']))
  @Delete('/delete/:id')
  deleteOrder(@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  // Người dùng: Lấy danh sách đơn hàng của mình
  @UseGuards(AuthGuard('jwt'))
  @Get('/myorders')
  getMyOrders(@CurrentUser() data) {
    const userId = data.user.id;
    return this.orderService.getMyOrders(userId);
  }

  // Người dùng: Lấy chi tiết đơn hàng theo ID
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.orderService.orDerById(id);
  }
}
