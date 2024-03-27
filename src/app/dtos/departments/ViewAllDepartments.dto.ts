import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";



export class ViewAllDepartmentsDto {

    @ApiProperty({
        description: 'Page number',
        required: false
    })
    @IsOptional()
    page: number;

    @ApiProperty({
        description: 'Number of items per page',
        required: false
    })
    @IsOptional()
    limit: number;
}
