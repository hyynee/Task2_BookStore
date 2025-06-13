import { Body, Controller, Get, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/currentUser.decorator';
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
}
