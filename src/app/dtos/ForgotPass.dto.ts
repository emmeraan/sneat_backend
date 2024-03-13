import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty} from "class-validator"


export class ForgotPassDto {

    @ApiProperty({
        description: 'Enter your email',
        example: 'user@email.com',
        required: true
    })
    @IsNotEmpty()
    email: string

}