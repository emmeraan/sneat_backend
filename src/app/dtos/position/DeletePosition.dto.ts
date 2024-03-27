import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class DeletePositionDto{
    
    @ApiProperty({
        description: 'id of position want to delete',
        example: 1,
        required: true
    })
    id: number

}