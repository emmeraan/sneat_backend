import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateEmployeeDto{
    @ApiProperty({
        description: 'firstname of user',
        example: 'Emmeraan',
        required: false
    })
    @IsString()  
    firstname: string

    @ApiProperty({
        description: 'lastname of user',
        example: 'Emmeraan',
        required: false
    }) 
    @IsString()   
    lastname: string

    @ApiProperty({
        description: 'Email of user',
        example: 'user123@xyz.com',
        required: false
    })
    @IsEmail()  
    email: string

    @ApiProperty({
        description: 'password of user',
        example: 'qwe',
        required: false
    })
    @IsString()    
    password: string

    @ApiProperty({
        description: 'image',
        example: 'xyz',
        required: false
    })  
    image: string

    @ApiProperty({
        description: 'date of birth',
        example: '2022-04-01',
        required: false
    })
    @IsDateString()  
    DateOfBirth: string

    @ApiProperty({
        description: 'phone number of user',
        example: '123456',
        required: false
    })  
    phone: number

    @ApiProperty({
        description: 'address of user',
        example: 'house 123',
        required: false
    })  
    address: string

    @ApiProperty({
        description: 'position of user',
        example: 'HR',
        required: false
    })  
    position: string

    @ApiProperty({
        description: 'departement of user',
        example: 'SQA',
        required: false
    })  
    departement: string
}