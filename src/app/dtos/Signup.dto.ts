import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignupDto {

  @ApiProperty({
    description: 'enter firstname',
    example: 'firstname',
    required: true,
  })
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    description: 'enter lastname',
    example: 'username',
    required: true,
  })
  @IsNotEmpty()
  lastname: string;

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

  @ApiProperty({
    description: 'Enter a platform name',
    example: 'xyzcompany',
    required: true,
  })
  @IsNotEmpty()
  @Length(2, 20)
  platform_name: string;
}
