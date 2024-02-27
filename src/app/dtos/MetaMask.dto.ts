import { ApiProperty } from "@nestjs/swagger";

export class MetaMaskDto {
    @ApiProperty({
        description: 'enter metamask address',
        example: 'egadf4a5df',
        required: true
    })
    address:any
}