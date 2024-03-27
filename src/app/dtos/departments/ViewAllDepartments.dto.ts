import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
export class ViewAllDepartmentsDto {

    @ApiProperty({
        description: 'Page number',
        example:1,
        required: true
    })
    page: number;

    @ApiProperty({
        description: 'Number of items per page',
        required: true,
        example:10
    })
    limit: number;
}
