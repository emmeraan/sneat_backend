import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateVendorDto{
    @ApiProperty({
        description: 'firstname of user',
        example: 'Emmeraan',
        required: false
    })
    @IsString()  
    username: string

    @ApiProperty({
        description: 'Email of user',
        example: 'user123@xyz.com',
        required: false
    })
    @IsEmail()  
    email: string

    @ApiProperty({
        description: 'image',
        example: 'xyz',
        required: false
    })  
    image: string

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
        description: 'country',
        example: 'Pakistan',
        required: false
    })  
    country: string
}