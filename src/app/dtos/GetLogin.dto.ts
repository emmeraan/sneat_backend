import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty} from "class-validator"


export class GetLoginDto {

    @ApiProperty({
        description: 'Enter your email or username',
        example: 'naeem@shahzad.com / @naeem',
        required: true
    })
    @IsNotEmpty()
    email_or_username: string

    @ApiProperty({
        description: 'Enter your password',
        example: 'some password',
        required: true
    })
    @IsNotEmpty()
    password: string




}
