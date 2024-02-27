import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserByAdmin{
    @ApiProperty({
        description: 'Enter Id of User you want to Update',
        example: '25',
        required: true
    }) 
    @IsNotEmpty() 
    id: number

    @ApiProperty({
        description: 'full_name of user',
        example: 'Emmeraan',
        required: false
    })  
    full_name: string

    @ApiProperty({
        description: 'Email of user',
        example: 'user123@xyz.com',
        required: false
    })  
    email: string

    @ApiProperty({
        description: 'password of user',
        example: 'xyz',
        required: false
    })  
    password: string

    @ApiProperty({
        description: 'Role of  user',
        example: 'Admin',
        required: false
    })  
    role: string

    @ApiProperty({
        description: 'image of user',
        example: 'xyz.jpg',
        required: false
    })  
    image: string
}