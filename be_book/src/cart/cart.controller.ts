import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../user/decorator/currentUser.decorator';
import { CartService } from './cart.service';
import { CreateCartItemDTO } from './dto/create-cart.dto';

@Controller('cart')
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('')
  getCart(@Query('userId') userId: string, @Query('guestId') guestId: string) {
    return this.cartService.getCart({ userId, guestId });
  }

  @Post('')
  addToCart(@Body() cartItem: CreateCartItemDTO) {
    return this.cartService.addToCart(cartItem);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/merge')
  mergeCart(@Body() cartItem: CreateCartItemDTO, @CurrentUser() curuserId) {
    const userId = curuserId.user.id;
    return this.cartService.mergeCart(cartItem, userId);
  }

  @Put('')
  updateCart(@Body() cartItem: CreateCartItemDTO) {
    return this.cartService.updateCart(cartItem);
  }

  @Delete('')
  deleteCartItem(@Body() cartItem: CreateCartItemDTO) {
    return this.cartService.deleteCartItem(cartItem);
  }
}
