"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../Schemas/user.schema");
let UserService = class UserService {
    userModel;
    jwtService;
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        console.log('createUserDto:', createUserDto);
        const { email } = createUserDto;
        try {
            const user = await this.userModel.findOne({ email });
            if (user) {
                throw new common_1.HttpException({ statusCode: 400, message: 'Email already exists' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const newUser = new this.userModel(createUserDto);
            await newUser.save();
            const payload = { user: { id: newUser.id, role: newUser.role } };
            const token = this.jwtService.sign(payload);
            return { user: newUser, token };
        }
        catch (error) {
            console.error('Error during registration:', error);
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map((err) => ({
                    field: err.path,
                    message: err.message,
                }));
                throw new common_1.HttpException({
                    statusCode: 400,
                    message: 'Validation failed',
                    errors: validationErrors,
                }, common_1.HttpStatus.BAD_REQUEST);
            }
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(login) {
        const { email, password } = login;
        console.log('login:', login);
        try {
            const user = await this.userModel.findOne({
                email,
            });
            console.log('user', user);
            if (!user) {
                throw new common_1.HttpException({ statusCode: 400, message: 'Invalid credentials' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const isMatch = await user.comparePassword(password);
            console.log('Password match:', isMatch);
            if (!isMatch) {
                throw new common_1.HttpException({ statusCode: 400, message: 'Invalid credentials' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const payload = { user: { id: user.id, role: user.role } };
            const token = this.jwtService.sign(payload);
            return { user: user, token };
        }
        catch (error) {
            console.error('Error during login:', error);
            if (error instanceof common_1.HttpException) {
                throw error;
            }
            throw new common_1.HttpException({ statusCode: 500, message: 'Internal Server Error' }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getCurrentUser(req) {
        return req.currentUser;
    }
    async getUserById(id) {
        const user = await this.userModel.findById(id);
        return user;
    }
};
exports.UserService = UserService;
__decorate([
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getCurrentUser", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map