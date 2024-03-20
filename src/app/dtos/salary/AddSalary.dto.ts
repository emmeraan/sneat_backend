import { ApiProperty } from "@nestjs/swagger";
import { CreateEmployeeDto } from "../employee/CreateEmployee.dto";

export class AddSalaryDto extends CreateEmployeeDto{
    @ApiProperty({
        description: 'Enter salary of employee',
        example: 2222,
        required: true,
      })
      basic: number;

      @ApiProperty({
        description: 'Enter medical allowence if any of employee',
        example: 2222,
        required: true,
      })
      medical_allowence: number;

      @ApiProperty({
        description: 'Enter medical allowence if any of employee',
        example: 2222,
        required: true,
      })
      bonus: number;

      @ApiProperty({
        description: 'Enter start date of salary employee',
        example: '2022-08-01',
        required: true,
      })
      start_date: number;

      @ApiProperty({
        description: 'Enter start date of salary employee',
        example: '2022-08-01',
        required: true,
      })
      end_date: number;
}