import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInstance, IsNotEmpty, IsNumber, IsOptional, Validate, ValidateNested, isIn } from "class-validator";

export class UpdateAttendenceDto{
    @ApiProperty({
        description: 'Attendence Id',
        example: 1,
        required: true
    })
    id: number

    @ApiProperty({
        description: 'status enum Present,Absent or Leave',
        example: 'Absent',
        required: true
    })
    @IsNotEmpty()
    @IsEnum(['Present', 'Leave','Absent'])
    status: string

    @ApiProperty({
        description: 'type of leave Paid, UnPaid',
        example: 'Paid',
        required: true
    })
    @IsOptional()
    @IsEnum(['Paid','UnPaid'])
    leave_type: string

    @ApiProperty({
        description: 'checkin or checkout',
        example: 'checkin',
        required: false
    })
    check: string
}