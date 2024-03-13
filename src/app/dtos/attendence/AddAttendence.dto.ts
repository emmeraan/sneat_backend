import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, Validate, ValidateNested } from "class-validator";
import { DbExistsValidation } from "src/app/utils/validations/DbExists.validation";
import { IsDate } from "sequelize-typescript";

export class AddAttendenceDto{
    @ApiProperty({
        description: 'Employee Id',
        example: 1,
        required: true
    })
    @IsNumber()
    // @Validate(DbExistsValidation, ['user'])
    employee_id: number

    @ApiProperty({
        description: 'checkin or checkout',
        example: 'checkin',
        required: true
    })
    @IsNotEmpty()
    type: string

    @ApiProperty({
        description: 'status',
        example: 'Present',
        required: true
    })
    @IsNotEmpty()
    status: string
}