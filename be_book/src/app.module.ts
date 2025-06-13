import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from 'config/database.module';
import * as multer from 'multer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UploadController } from './uploadImage/upload';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { CheckoutModule } from './checkout/checkout.module';
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // cau hinh de upload image
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    UserModule,
    BookModule,
    CartModule,
    OrderModule,
    CheckoutModule,
  ],
  controllers: [AppController, UploadController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
