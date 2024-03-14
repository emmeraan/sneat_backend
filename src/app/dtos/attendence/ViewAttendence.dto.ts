import { ApiProperty } from "@nestjs/swagger";
import { PaginationDto } from "../Pagination.dto";
import { IsEnum, IsNotEmpty, IsNumber, Validate } from "class-validator";
import { DbExistsValidation } from "src/app/utils/validations/DbExists.validation";
import { Type } from "class-transformer";
enum StatusTYPE {
    Present = 'Present',
    Absent = 'Absent',
    Leave = 'Leave',
    Late = 'Late'
  }
export class ViewAttendenceDto extends PaginationDto {
    @ApiProperty({
        description: 'employee_id',
        example: 1,
        required: true
    })
    @Type(() => Number)
    @IsNumber()
    // @Validate(DbExistsValidation, ['user'])
    @IsNotEmpty()
    employee_id: number

    @ApiProperty({
        description: 'status',
        example: 'Present',
        required: false
    })
    @IsEnum(StatusTYPE)
    status: string

    @ApiProperty({
        description: 'date of checkin',
        example: '2024-04-05',
        required: false
    })
    date: string
}