import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  address: string;
  role?: 'admin' | 'customer';
}
