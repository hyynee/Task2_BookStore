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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const swagger_1 = require("@nestjs/swagger");
const bcrypt = require("bcrypt");
const mongoose_2 = require("mongoose");
let User = class User extends mongoose_2.Document {
    name;
    email;
    password;
    phone;
    address;
    role;
    async comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Tên là bắt buộc'],
        trim: true,
        minlength: [2, 'Tên phải có ít nhất 2 ký tự'],
        maxlength: [50, 'Tên không được vượt quá 50 ký tự'],
        match: [/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái và khoảng trắng'],
    }),
    (0, swagger_1.ApiProperty)({
        example: 'Nguyễn Văn A',
        description: 'Họ và tên đầy đủ của người dùng',
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Email là bắt buộc'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Email không hợp lệ',
        ],
        maxlength: [100, 'Email không được vượt quá 100 ký tự'],
    }),
    (0, swagger_1.ApiProperty)({
        example: 'nguyenvana@example.com',
        description: 'Email duy nhất của người dùng',
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Mật khẩu là bắt buộc'],
        minlength: [8, 'Mật khẩu phải có ít nhất 8 ký tự'],
        maxlength: [100, 'Mật khẩu không được vượt quá 100 ký tự'],
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
            },
            message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
        },
    }),
    (0, swagger_1.ApiProperty)({
        example: 'Password123!',
        description: 'Mật khẩu mạnh với ít nhất 8 ký tự',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Số điện thoại là bắt buộc'],
        trim: true,
        match: [
            /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/,
            'Số điện thoại không hợp lệ',
        ],
        unique: true,
    }),
    (0, swagger_1.ApiProperty)({
        example: '0912345678',
        description: 'Số điện thoại di động hợp lệ tại Việt Nam',
    }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Địa chỉ là bắt buộc'],
        trim: true,
        minlength: [10, 'Địa chỉ phải có ít nhất 10 ký tự'],
        maxlength: [200, 'Địa chỉ không được vượt quá 200 ký tự'],
    }),
    (0, swagger_1.ApiProperty)({
        example: '123 Đường Lê Lợi, Quận 1, TP.HCM',
        description: 'Địa chỉ đầy đủ của người dùng',
    }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: {
            values: ['admin', 'customer'],
            message: 'Vai trò phải là admin hoặc customer',
        },
        default: 'customer',
    }),
    (0, swagger_1.ApiProperty)({
        enum: ['admin', 'customer'],
        default: 'customer',
        description: 'Vai trò của người dùng trong hệ thống',
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
    })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
exports.UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
exports.UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};
//# sourceMappingURL=user.schema.js.map