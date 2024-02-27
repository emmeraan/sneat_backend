import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class VerifyMetamaskDto {
    @ApiProperty({
        description: 'enter metamask address',
        example: 'egadf4a5df',
    })
    address:any

    @ApiProperty({
        description: 'enter signature',
        example: 'egadf4a5df',
    })
    signature:any

    @ApiProperty({
        description: 'Enter your timezone',
        example: '-300',
        required: true
    })
    @IsNotEmpty()
    timezone: string
}