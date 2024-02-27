import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignupDto {

  @ApiProperty({
    description: 'enter username',
    example: 'username',
    required: true,
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'email of user',
    example: 'user@gmail.com',
    required: true,
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Enter a strong password',
    example: 'password',
    required: true,
  })
  @IsNotEmpty()
  @Length(5, 20)
  password: string;
}
