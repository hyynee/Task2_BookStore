import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/user/decorator/currentUser.decorator';
import { CheckoutService } from './checkout.service';
import { CheckoutDTO, CreateCheckoutDTO } from './dto/create-checkout.dto';

@Controller('checkout')
@ApiTags('Checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  // http:localhost:8080/checkout
  // @Post /checkout
  // create a new checkout

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  checkout(@Body() checkout: CreateCheckoutDTO, @CurrentUser() curUserId) {
    const userId = curUserId.user.id;
    return this.checkoutService.checkout(checkout, userId);
  }

  // @Put /checkout/:id/pay
  // update the checkout after a successful payment
  @Put('/:id/pay')
  payCheckout(@Body() checkout: CheckoutDTO, @Param('id') id: string) {
    return this.checkoutService.payCheckout(checkout, id);
  }

  // @Post /checkout/:id/finalize
  // finalize the checkout and convert to an order after payment confirmation
  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/finalize')
  finalizeCheckout(@Param('id') id: string) {
    return this.checkoutService.finalizeCheckout(id);
  }
}
