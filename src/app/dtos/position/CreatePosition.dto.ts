import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreatePositionDto{
    
    @ApiProperty({
        description: 'id of departement',
        example: 1,
        required: true
    })
    department_id: number

    @ApiProperty({
        description: 'name of position',
        example: 'Director',
        required: true
    })
    @IsString()  
    name: string

}