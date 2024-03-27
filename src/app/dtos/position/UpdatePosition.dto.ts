import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdatePositionDto{

    @ApiProperty({
        description: 'id of position',
        example: 1,
        required: true
    })
    id: number
    
    // @ApiProperty({
    //     description: 'id of departement',
    //     example: 1,
    //     required: false
    // })
    // department_id: number

    @ApiProperty({
        description: 'name of position',
        example: 'Director',
        required: false
    })
    @IsString()  
    name: string

}