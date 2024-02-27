import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsNotEmpty} from "class-validator"


export class OtpVerificationDto {

    @ApiProperty({
        description: 'Enter your email',
        example: 'naeem@shahzad.com',
        required: true
    })
    @IsNotEmpty()
    email: string

    @ApiProperty({
        description: 'Enter OTP which you recive from email',
        example: '1589',
        required: true
    })
    @IsNotEmpty()
    otp: number




}