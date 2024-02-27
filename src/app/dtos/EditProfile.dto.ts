

import { ApiProperty } from "@nestjs/swagger"
import { isNotEmpty, IsNotEmpty } from "class-validator"

export class EditProfileDto {

    @ApiProperty({
        description: 'full_name of user',
        example: 'Naeem',
        required: false
    })  
    full_name: string


    @ApiProperty({
        description: 'Enter your image title',
        example: 'Your image title here',
        required: false
    })
    image: string

    @ApiProperty({
        description: 'Choose a username',
        example: 'Your image title here',
        required: false
    })
    username: string

    @ApiProperty({
        description: 'user phone number',
        example: '+00 000 000000',
        required: false
    })
    phone: number

    @ApiProperty({
        description: 'user bio',
        example: 'Here will be user bio info',
        required: false
    })
    bio: string


}



