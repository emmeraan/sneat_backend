import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { AddSalaryDto } from '../salary/AddSalary.dto';

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
    required: true,
  })
  image: string;

  @ApiProperty({
    description: 'date of birth',
    example: '2022-04-01',
    required: false,
  })
  @IsDateString()
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
    example: 3321,
    required: false,
  })
  @IsNumber()
  cnic: number;

  @ApiProperty({
    description: 'address of user',
    example: 'house 123',
    required: false,
  })
  address: string;

  @ApiProperty({
    description: 'position of user',
    example: 'HR',
    required: false,
  })
  position: string;

  @ApiProperty({
    description: 'department of user',
    example: 'SQA',
    required: false,
  })
  department: string;

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
  martial_status: string;

  @ApiProperty({
    description: 'Joining date of employee',
    example: '01-02-2022',
    required: true,
  })
  join_date: string;

  @ApiProperty({
    description: 'city of employee belong',
    example: 'city',
    required: false,
  })
  city: string

  @ApiProperty({
    description: 'gender of employee',
    example: 'Male',
    required: false,
  })
  gender:string

  @ApiProperty({
    description: 'Salary type of employee',
    example: 'Monthly',
    required: true,
  })
  @IsEnum(['Monthly','Weekly','Daily'])
  salary_type:string
}

