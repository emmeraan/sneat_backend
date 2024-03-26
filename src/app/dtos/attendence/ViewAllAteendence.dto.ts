import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsDateString, IsInt, Min, IsOptional } from "class-validator";

enum StatusTYPE {
    Present = 'Present',
    Absent = 'Absent',
    Leave = 'Leave',
}

export class ViewAllAttendanceDto {
    @ApiProperty({
        description: 'Status in enum Present, Absent, Leave',
        example: 'Present',
        required: false
    })
    @IsOptional()
    @IsEnum(StatusTYPE)
    status: string;

    @ApiProperty({
        description: 'From date for filtering (YYYY-MM-DD)',
        required: false
    })
    @IsOptional()
    @IsDateString()
    fromDate: string;

    @ApiProperty({
        description: 'To date for filtering (YYYY-MM-DD)',
        required: false
    })
    @IsOptional()
    @IsDateString()
    toDate: string;

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

    @ApiProperty({
        description: 'User ID for filtering',
        required: false
    })
    @IsOptional()
    employee_id: number;
}
