import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDepartmentDto{
    @ApiProperty({
        description: 'Admin_id',
        example: 1,
        required: true
    })
    admin_id: number

    @ApiProperty({
        description: 'name of department',
        example: 'Account',
        required: false
    })
    @IsString()  
    name: string



    @ApiProperty({
        description: 'location of department',
        example: 'xyz',
        required: false
    }) 
    @IsString() 
    location: string


    @ApiProperty({
        description: 'head of department',
        example: 'xyz',
        required: false
    })
    @IsString()  
    department_head: string
}