import { CreateUserDTO } from './dto/create-user.dto';
import { LoginDTO } from './dto/login.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(createUserDto: CreateUserDTO): Promise<{
        user: import("../../Schemas/user.schema").User;
        token: string;
    }>;
    login(login: LoginDTO): Promise<{
        user: import("../../Schemas/user.schema").User;
        token: string;
    }>;
    getCurrentUser(CurrentUser: any): Promise<import("../../Schemas/user.schema").User | null>;
    getAllUsers(): Promise<(import("mongoose").Document<unknown, {}, import("../../Schemas/user.schema").User, {}> & import("../../Schemas/user.schema").User & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    getUserByID(id: string): Promise<import("../../Schemas/user.schema").User | null>;
    updateUser(id: string, createUserDto: CreateUserDTO): Promise<{
        status: number;
        message: string;
        user: undefined;
    } | {
        status: number;
        message: string;
        user: (import("mongoose").Document<unknown, {}, import("../../Schemas/user.schema").User, {}> & import("../../Schemas/user.schema").User & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }) | null;
    }>;
}
