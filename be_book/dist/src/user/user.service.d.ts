import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'Schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
export declare class UserService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    register(createUserDto: CreateUserDTO): Promise<{
        user: User;
        token: string;
    }>;
    login(login: LoginDTO): Promise<{
        user: User;
        token: string;
    }>;
    getCurrentUser(req: any): Promise<any>;
    getUserById(id: string): Promise<(import("mongoose").Document<unknown, {}, User, {}> & User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }) | null>;
}
