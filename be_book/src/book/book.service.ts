import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'Schemas/book.shema';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
  ) {}

  async getAllBooks(filters: any) {
    const query: any = {};
    // Lọc theo author nếu có
    if (filters.author)
      query.author = { $regex: filters.author, $options: 'i' };
    // Lọc theo khoảng giá
    if (filters.minPrice !== undefined)
      query.price = { $gte: parseFloat(filters.minPrice.replace('$', '')) };
    if (filters.maxPrice !== undefined) {
      query.price = query.price || {};
      query.price.$lte = parseFloat(filters.maxPrice.replace('$', ''));
    }
    // Lọc theo số đánh giá tối thiểu
    if (filters.minReviews !== undefined)
      query.numReviews = { $gte: filters.minReviews };
    // Lọc sách đã xuất bản nếu có
    if (filters.accessPublic) query.isPublished = true;
    // Sắp xếp
    let sortOptions: any = {};
    if (filters.sortBy) {
      if (filters.sortBy === 'priceAsc') {
        sortOptions.price = 1;
      } else if (filters.sortBy === 'priceDesc') {
        sortOptions.price = -1;
      } else if (filters.sortBy === 'popularity') {
        sortOptions.rating = -1;
      } else {
        sortOptions[filters.sortBy] = filters.order === 'desc' ? -1 : 1;
      }
    }
    // Phân trang
    const page = Math.max(1, filters.page || 1);
    const limit = Math.max(1, filters.limit || 10);
    const skip = (page - 1) * limit;
    return await this.bookModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async getBookById(id: string): Promise<Book> {
    try {
      const book = await this.bookModel.findById(id);
      if (!book) {
        throw new HttpException(
          {
            statusCode: 404,
            message: `Book with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return book;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getSimilarBooks(id: string): Promise<Book[]> {
    try {
      const book = await this.bookModel.findById(id);
      if (!book) {
        throw new HttpException(
          {
            statusCode: 404,
            message: `Book with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const similarBooks = await this.bookModel
        .find({
          _id: { $ne: id },
          author: book.author, // Tìm sách có cùng tác giả
        })
        .limit(4);
      return similarBooks;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getBestSellerBooks() {
    try {
      const bestseller = await this.bookModel.findOne().sort({
        rating: -1,
      });
      if (bestseller) {
        return bestseller;
      } else {
        throw new HttpException(
          {
            statusCode: 404,
            message: `No BestSeller Book not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getNewArrivalBooks() {
    try {
      if (!this.bookModel) {
        throw new Error('Book model is not initialized');
      }
      console.log('Starting getNewArrivalBooks...');
      const newArrivalBooks = await this.bookModel
        .find()
        .sort({
          createdAt: -1,
        })
        .limit(8);
      console.log('Found books:', newArrivalBooks.length);
      return newArrivalBooks;
    } catch (error) {
      console.error('Error in getNewArrivalBooks:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createBook(book: CreateBookDTO) {
    const createdBook = new this.bookModel(book);
    return {
      statusCode: 200,
      message: 'Create success',
      book: await createdBook.save(),
    };
  }

  async updateBook(book: UpdateBookDTO, id: string) {
    const existingBook = await this.bookModel.findById(id);
    if (!existingBook) {
      throw new HttpException(
        {
          statusCode: 404,
          message: `Book with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const updateData = {};
    Object.keys(book).forEach((key) => {
      // Giữ giá trị cũ nếu giá trị mới là null, rỗng hoặc undefined
      if (book[key] !== undefined && book[key] !== null && book[key] !== '') {
        updateData[key] = book[key];
      }
    });
    return {
      statusCode: 200,
      message: 'Update success',
      book: await this.bookModel.findByIdAndUpdate(id, updateData, {
        new: true,
      }),
    };
  }

  async deleteBookById(id: string) {
    try {
      const existBook = await this.bookModel.findById(id);
      if (!existBook) {
        throw new HttpException(
          {
            statusCode: 404,
            message: `Book with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: 200,
        message: 'Delete success',
        book: await this.bookModel.findByIdAndDelete(id),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
