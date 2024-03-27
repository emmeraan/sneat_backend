import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDepartmentDto{

    @ApiProperty({
        description: 'name of department',
        example: 'Account',
        required: false
    })
    @IsString()  
    name: string

}