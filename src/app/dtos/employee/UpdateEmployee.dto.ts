import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmployeeDto {
  @ApiProperty({
    description: 'Enter Id of User you want to Update',
    example: '25',
    required: true,
  })
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'firstname of user',
    example: 'Emmeraan',
    required: false,
  })
  firstname: string;

  @ApiProperty({
    description: 'lastname of user',
    example: 'Emmeraan',
    required: false,
  })
  lastname: string;

  @ApiProperty({
    description: 'Email of user',
    example: 'user123@xyz.com',
    required: false,
  })
  email: string;

  @ApiProperty({
    description: 'password of user',
    example: 'qwe',
    required: false,
  })
  password: string;

  @ApiProperty({
    description: 'image',
    example: 'xyz',
    required: false,
  })
  image: string;

  @ApiProperty({
    description: 'date of birth',
    example: '2022-04-01',
    required: false,
  })
  DateOfBirth: string;

  @ApiProperty({
    description: 'phone number of user',
    example: '123456',
    required: false,
  })
  phone: number;

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
    description: 'departement of user',
    example: 'SQA',
    required: false,
  })
  departement: string;

  @ApiProperty({
    description: 'designation of user',
    example: 'SQA',
    required: false,
  })
  designation: string;

  @ApiProperty({
    description: 'Status of employee work. Retired, Terminated, Active',
    example: 'Retired',
    required: false,
  })
  employment_Status: string;

  @ApiProperty({
    description: 'martial status of employee. Married, single',
    example: 'Married',
    required: false,
  })
  martial_status: string;

  @ApiProperty({
    description: 'Joining date of employee',
    example: '01-02-2022',
    required: false,
  })
  join_date: string;

  @ApiProperty({
    description: 'city of employee belong',
    example: 'city',
    required: false,
  })
  city: string;

  @ApiProperty({
    description: 'gender of employee',
    example: 'Male',
    required: false,
  })
  gender: string;
}
