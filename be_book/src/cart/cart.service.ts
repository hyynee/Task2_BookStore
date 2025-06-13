import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from 'Schemas/book.shema';
import { Cart } from 'Schemas/cart.shema';
import { CreateCartItemDTO } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async addToCart(cartDTO: CreateCartItemDTO) {
    const { bookId, quantity, price, guestId, userId } = cartDTO;
    const book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    // Tìm giỏ hàng
    const query = userId
      ? { user: new Types.ObjectId(userId) }
      : { guestId: guestId || `guest_${new Date().getTime()}` };
    let cart = await this.cartModel.findOne(query).exec();
    if (cart) {
      const bookIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId.toString(),
      );
      if (bookIndex > -1) {
        cart.items[bookIndex].quantity += quantity;
      } else {
        cart.items.push({
          bookId,
          quantity,
          price: book.price,
          title: book.title,
          image: book.image,
        });
      }
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
    } else {
      cart = await this.cartModel.create({
        user: userId ? new Types.ObjectId(userId) : undefined,
        guestId: guestId || `guest_${new Date().getTime()}`,
        items: [
          {
            bookId,
            quantity,
            price: book.price,
            title: book.title,
            image: book.image,
          },
        ],
        totalPrice: book.price * quantity,
      });
    }
    return {
      status: 200,
      message: cart ? 'Book updated in cart' : 'Book added to cart',
      data: cart,
    };
  }

  async updateCart(cartDTO: CreateCartItemDTO) {
    const { bookId, quantity, guestId, userId } = cartDTO;
    try {
      const query = userId ? { user: new Types.ObjectId(userId) } : { guestId };
      let cart = await this.cartModel.findOne(query);
      if (!cart) {
        throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
      }
      const bookIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId.toString(),
      );
      if (bookIndex > -1) {
        if (quantity > 0) {
          cart.items[bookIndex].quantity = quantity;
        } else {
          cart.items.splice(bookIndex, 1);
        }
      }
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );
      await cart.save();
      return {
        status: 200,
        message: 'Book updated in cart',
        data: cart,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCartItem(cartDTO: CreateCartItemDTO) {
    const { bookId, guestId, userId } = cartDTO;
    try {
      const query = userId ? { user: new Types.ObjectId(userId) } : { guestId };
      let cart = await this.cartModel.findOne(query);
      if (!cart) {
        throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
      }
      const bookIndex = cart.items.findIndex(
        (item) => item.bookId.toString() === bookId.toString(),
      );
      if (bookIndex > -1) {
        cart.items.splice(bookIndex, 1);
        cart.totalPrice = cart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
      }
      await cart.save();
      return {
        status: 200,
        message: 'Book removed from cart',
        data: cart,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getCart(cartDTO: { userId?: string; guestId?: string }) {
    const { guestId, userId } = cartDTO;
    const query = userId ? { user: new Types.ObjectId(userId) } : { guestId };
    try {
      const cart = await this.cartModel.findOne(query).exec();
      if (cart) {
        return {
          status: 200,
          message: 'Cart retrieved successfully',
          data: cart,
        };
      } else {
        throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async mergeCart(cartDTO: CreateCartItemDTO, userId: string) {
    const { guestId, bookId, quantity, price } = cartDTO;
    try {
      const book = await this.bookModel.findById(bookId);
      if (!book) {
        throw new HttpException('Book not found', HttpStatus.BAD_REQUEST);
      }
      const guestCart = await this.cartModel.findOne({ guestId });
      const userCart = await this.cartModel.findOne({
        user: new Types.ObjectId(userId),
      });
      if (!guestCart) {
        if (userCart) {
          return {
            status: 200,
            message: 'Guest cart has already been merged, returning user cart',
            data: userCart,
          };
        }
        return {
          status: 200,
          message: 'No guest cart, returning empty cart',
          data: { items: [], totalPrice: 0 },
        };
      }
      if (guestCart.items.length === 0) {
        throw new HttpException('Guest cart is empty', HttpStatus.NOT_FOUND);
      }
      if (userCart) {
        for (const guestItem of guestCart.items) {
          const book = await this.bookModel.findById(guestItem.bookId);
          if (!book) continue;
          const bookIndex = userCart.items.findIndex(
            (item) => item.bookId.toString() === guestItem.bookId.toString(),
          );
          if (bookIndex > -1) {
            userCart.items[bookIndex].quantity += guestItem.quantity;
          } else {
            userCart.items.push({
              bookId: guestItem.bookId,
              title: book.title,
              image: book.image,
              price: book.price,
              quantity: guestItem.quantity,
            });
          }
        }
        userCart.totalPrice = userCart.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        );
        await userCart.save();
        await this.cartModel.findOneAndDelete({ guestId });
        return {
          status: 200,
          message: 'Cart merged successfully',
          data: userCart,
        };
      } else {
        if (!userId) {
          throw new HttpException(
            'User ID is required to assign guest cart',
            HttpStatus.BAD_REQUEST,
          );
        }
        guestCart.user = new Types.ObjectId(userId);
        guestCart.guestId = undefined;
        await guestCart.save();
        return {
          status: 200,
          message: 'Guest cart assigned to user successfully',
          data: guestCart,
        };
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
