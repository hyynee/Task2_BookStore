import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../middleware/role.guard';
import { BookService } from './book.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';

@Controller('books')
@ApiTags('Books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(
    @Query('author') author?: string,
    @Query('minReviews') minReviews?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('sortBy') sortBy?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('accessPublic') accessPublic?: boolean,
  ) {
    return await this.bookService.getAllBooks({
      author,
      minPrice,
      maxPrice,
      minReviews,
      sortBy,
      order,
      page,
      limit,
      accessPublic,
    });
  }

  // ĐẶT CÁC ROUTES CỐ ĐỊNH TRƯỚC ROUTES ĐỘNG
  @Get('best-seller')
  getBestSellerBooks() {
    return this.bookService.getBestSellerBooks();
  }

  @Get('new-arrivals')
  getNewArrivalBooks() {
    return this.bookService.getNewArrivalBooks();
  }

  @Get('similar/:id')
  getSimilarBooks(@Param('id') id: string) {
    return this.bookService.getSimilarBooks(id);
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @ApiBearerAuth()
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Post()
  createBook(@Body() book: CreateBookDTO) {
    return this.bookService.createBook(book);
  }

  @ApiBearerAuth()
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Put(':id')
  updateBook(@Body() book: UpdateBookDTO, @Param('id') id: string) {
    return this.bookService.updateBook(book, id);
  }

  @ApiBearerAuth()
  @UseGuards(new RolesGuard(['admin']))
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(200)
  @Delete(':id')
  deleteBookById(@Param('id') id: string) {
    return this.bookService.deleteBookById(id);
  }
}
