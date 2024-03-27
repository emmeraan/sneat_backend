import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto{
  @ApiProperty({
    description: 'firstname of user',
    example: 'Emme',
    required: true,
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'lastname of user',
    example: 'raan',
    required: true,
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Email of user',
    example: 'user123@xyz.com',
    required: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'image',
    example: 'xyz',
    required: false,
  })
  @IsString()
  image: string;

  @ApiProperty({
    description: 'date of birth',
    example: '2022-04-01',
    required: false,
  })
  @IsString()
  // @IsDateString()
  DateOfBirth: string;

  @ApiProperty({
    description: 'phone number of user',
    example: 123456,
    required: false,
  })
  @IsNumber()
  phone: number;

  @ApiProperty({
    description: 'cnic number of user',
    example: "332111111111",
    required: false,
  })
  cnic: string;

  @ApiProperty({
    description: 'address of user',
    example: 'house 123',
    required: false,
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'position of user',
    example: 'HR',
    required: false,
  })
  position_id: string;

  @ApiProperty({
    description: 'department id of user',
    example: '1',
    required: false,
  })
  department_id: number;

  // @ApiProperty({
  //   description: 'Status of employee work. Retired, Terminated, Active',
  //   example: 'Retired',
  //   required: false,
  // })
  // employment_Status: string;

  @ApiProperty({
    description: 'martial status of employee. Married, single',
    example: 'Married',
    required: false,
  })
  @IsString()
  martial_status: string;

  @ApiProperty({
    description: 'Joining date of employee',
    example: '2024-01-01',
    required: true,
  })
  @IsString()
  join_date: string;

  @ApiProperty({
    description: 'gender of employee',
    example: 'Male',
    required: false,
  })
  @IsString()
  gender:string
}

