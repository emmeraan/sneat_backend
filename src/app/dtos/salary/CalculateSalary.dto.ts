import { ApiProperty } from "@nestjs/swagger";

export class CalculateSalaryDto{
    @ApiProperty({
        description: 'Enter ID of employee',
        example: 1,
        required: true,
      })
      employee_id: number;

      @ApiProperty({
        description: 'Enter month and year to calculate Attendence of that month e.g 3-24',
        example: "2-2024",
        required: true,
      })
      date: string;

      // @ApiProperty({
      //   description: 'Enter year to calculate Attendence of that month',
      //   example: 1,
      //   required: true,
      // })
      // year: number;

      @ApiProperty({
        description: 'Enter amount percent want to deduct of that month salary',
        example: 10,
        required: false,
      })
      deduct_percent: number;
}