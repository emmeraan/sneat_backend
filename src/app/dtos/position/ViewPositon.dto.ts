import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ViewPositionDto{
    
    @ApiProperty({
        description: 'id of department want to view',
        example: 1,
        required: true
    })
    department_id: number

}