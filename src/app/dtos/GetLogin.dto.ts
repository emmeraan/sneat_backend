import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty} from "class-validator"


export class GetLoginDto {

    @ApiProperty({
        description: 'Enter your email',
        example: 'user@domain.com',
        required: true
    })
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'Enter your password',
        example: 'some password',
        required: true
    })
    @IsNotEmpty()
    password: string




}
