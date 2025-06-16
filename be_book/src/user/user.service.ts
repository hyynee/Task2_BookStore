import { HttpException, HttpStatus, Injectable, Request } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from 'Schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async register(
    createUserDto: CreateUserDTO,
  ): Promise<{ user: User; token: string }> {
    const { email, phone } = createUserDto;
    try {
      const existingUser = await this.userModel.findOne({
        $or: [{ email }, { phone }],
      });
      if (existingUser) {
        if (existingUser.email === email) {
          throw new HttpException(
            { statusCode: 400, message: 'Email already exists' },
            HttpStatus.BAD_REQUEST,
          );
        }
        if (existingUser.phone === phone) {
          throw new HttpException(
            { statusCode: 400, message: 'Phone number already exists' },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
      const newUser = new this.userModel(createUserDto);
      await newUser.save();
      const payload = { user: { id: newUser.id, role: newUser.role } };
      const token = this.jwtService.sign(payload);
      return { user: newUser, token };
    } catch (error) {
      console.error('Error during registration:', error);

      // Handle Mongoose validation errors
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values((error as any).errors).map(
          (err: any) => ({
            field: err.path,
            message: err.message,
          }),
        );
        throw new HttpException(
          {
            statusCode: 400,
            message: 'Validation failed',
            errors: validationErrors,
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      // Handle other errors
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async login(login: LoginDTO): Promise<{ user: User; token: string }> {
    const { email, password } = login;
    try {
      const user = await this.userModel.findOne({
        email,
      });
      console.log('user', user);
      if (!user) {
        throw new HttpException(
          { statusCode: 400, message: 'Invalid credentials' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const isMatch = await user.comparePassword(password);
      console.log('Password match:', isMatch);
      if (!isMatch) {
        throw new HttpException(
          { statusCode: 400, message: 'Invalid credentials' },
          HttpStatus.BAD_REQUEST,
        );
      }
      const payload = { user: { id: user.id, role: user.role } };
      // sign and return the token
      const token = this.jwtService.sign(payload);
      return { user: user, token };
    } catch (error) {
      console.error('Error during login:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        { statusCode: 500, message: 'Internal Server Error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getCurrentUser(@Request() req) {
    return req.currentUser;
  }
  async getUserById(id: string | null): Promise<User | null> {
    const user = await this.userModel.findById(id);
    return user;
  }

  async getAllUsers() {
    const users = await this.userModel.find();
    return users;
  }
  async updateUser(id: string, createUserDto: CreateUserDTO) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {
          status: 404,
          message: 'User not found',
          user: undefined,
        };
      }

      const updateData: Partial<User> = {
        name: createUserDto.name || user!.name,
        email: createUserDto.email || user!.email,
        phone: createUserDto.phone || user!.phone,
        address: createUserDto.address || user!.address,
        role: createUserDto.role || user!.role,
      };

      if (createUserDto.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(createUserDto.password, salt);
      }

      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true },
      );

      return {
        status: 200,
        message: 'User updated successfully',
        user: updatedUser,
      };
    } catch (err) {
      console.error('Error updating user:', err);
      throw new HttpException(
        {
          statusCode: 500,
          message: err.message || 'Internal server error',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
