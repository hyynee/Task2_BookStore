import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/middleware/role.guard';
import { CurrentUser } from './decorator/currentUser.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Post('register')
  async register(@Body() createUserDto: CreateUserDTO) {
    return await this.userService.register(createUserDto);
  }
  @HttpCode(200)
  @Post('login')
  async login(@Body() login: LoginDTO) {
    return await this.userService.login(login);
  }

  @Get('/currentUser')
  @UseGuards(AuthGuard('jwt'))
  getCurrentUser(@CurrentUser() CurrentUser) {
    const userId = CurrentUser.user.id;
    const user = this.userService.getUserById(userId);
    return user;
  }

  // admin
  @ApiBearerAuth()
  @Get('/all')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['admin']))
  @HttpCode(200)
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @ApiBearerAuth()
  @Get('/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['admin']))
  @HttpCode(200)
  getUserByID(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiBearerAuth()
  @Post('/update/:id')
  @UseGuards(AuthGuard('jwt'), new RolesGuard(['admin']))
  @HttpCode(200)
  async updateUser(
    @Param('id') id: string,
    @Body() createUserDto: CreateUserDTO,
  ) {
    return await this.userService.updateUser(id, createUserDto);
  }
}
