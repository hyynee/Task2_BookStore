import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';

@Schema({
  timestamps: true, // Adds createdAt and updatedAt fields automatically
})
export class User extends Document {
  @Prop({
    required: [true, 'Tên là bắt buộc'],
    trim: true,
    minlength: [2, 'Tên phải có ít nhất 2 ký tự'],
    maxlength: [50, 'Tên không được vượt quá 50 ký tự'],
    match: [/^[a-zA-ZÀ-ỹ\s]+$/, 'Tên chỉ được chứa chữ cái và khoảng trắng'],
  })
  @ApiProperty({
    example: 'Nguyễn Văn A',
    description: 'Họ và tên đầy đủ của người dùng',
  })
  name: string;

  @Prop({
    required: [true, 'Email là bắt buộc'],
    unique: true,
    trim: true,
    lowercase: true, // Store emails in lowercase
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email không hợp lệ',
    ],
    maxlength: [100, 'Email không được vượt quá 100 ký tự'],
  })
  @ApiProperty({
    example: 'nguyenvana@example.com',
    description: 'Email duy nhất của người dùng',
  })
  email: string;

  @Prop({
    required: [true, 'Mật khẩu là bắt buộc'],
    minlength: [8, 'Mật khẩu phải có ít nhất 8 ký tự'],
    maxlength: [100, 'Mật khẩu không được vượt quá 100 ký tự'],
    validate: {
      validator: function (value: string) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          value,
        );
      },
      message:
        'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt',
    },
  })
  @ApiProperty({
    example: 'Password123!',
    description: 'Mật khẩu mạnh với ít nhất 8 ký tự',
  })
  password: string;

  @Prop({
    required: [true, 'Số điện thoại là bắt buộc'],
    trim: true,
    match: [
      /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-9]|9\d)\d{7}$/,
      'Số điện thoại không hợp lệ',
    ],
    unique: true,
  })
  @ApiProperty({
    example: '0912345678',
    description: 'Số điện thoại di động hợp lệ tại Việt Nam',
  })
  phone: string;

  @Prop({
    required: [true, 'Địa chỉ là bắt buộc'],
    trim: true,
    minlength: [10, 'Địa chỉ phải có ít nhất 10 ký tự'],
    maxlength: [200, 'Địa chỉ không được vượt quá 200 ký tự'],
  })
  @ApiProperty({
    example: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    description: 'Địa chỉ đầy đủ của người dùng',
  })
  address: string;

  @Prop({
    enum: {
      values: ['admin', 'customer'],
      message: 'Vai trò phải là admin hoặc customer',
    },
    default: 'customer',
  })
  @ApiProperty({
    enum: ['admin', 'customer'],
    default: 'customer',
    description: 'Vai trò của người dùng trong hệ thống',
  })
  role: string;

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

// Hash password trước khi lưu
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
