import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class ProductDto{
    @ApiProperty({
        description: 'firstname of user',
        example: 'Emmeraan',
        required: false
    })
    @IsString()  
    name: string

    @ApiProperty({
        description: 'description of product',
        example: 'Description of product',
        required: false
    })
    @IsString()  
    description: string

    @ApiProperty({
        description: 'price of product',
        example: 123,
        required: false
    })  
    price: number

    @ApiProperty({
        description: 'stock quantity',
        example: 123,
        required: false
    })  
    stockQuantity: number

}