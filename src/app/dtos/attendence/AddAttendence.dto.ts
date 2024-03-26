import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInstance, IsNotEmpty, IsNumber, IsOptional, Validate, ValidateNested, isIn } from "class-validator";

enum StatusTYPE {
    Present = 'Present',
    Absent = 'Absent',
    Leave = 'Leave',
    Late = 'Late',
    Half_Day = 'Half_Day'
  }

export class AddAttendenceDto{
    @ApiProperty({
        description: 'Employee Id',
        example: 1,
        required: true
    })
    employee_id: number

    @ApiProperty({
        description: 'checkin or checkout',
        example: 'checkin',
        required: true
    })
    @IsNotEmpty()
    @IsEnum(['checkin', 'checkout'])
    type: string

    @ApiProperty({
        description: 'status',
        example: 'Present',
        required: true
    })
    @IsNotEmpty()
    @IsEnum(StatusTYPE)
    status: string

    // @ApiProperty({
    //     description: 'date of attendence',
    //     example: '2024-03-01',
    //     required: true
    // })
    // date: string
}

