import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty} from "class-validator"


export class ForgotPassDto {

    @ApiProperty({
        description: 'Enter your email',
        example: 'naeem@shahzad.com',
        required: true
    })
    @IsNotEmpty()
    email: string

}