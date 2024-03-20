import { ApiProperty } from "@nestjs/swagger";
import { CreateEmployeeDto } from "../employee/CreateEmployee.dto";
import { IsEnum } from "class-validator";

export class FinancialTransactionDto{
    @ApiProperty({
        description: 'Enter idof employee',
        example: 1,
        required: true,
      })
      employee_id: number;

    @ApiProperty({
        description: 'Enter salary of employee',
        example: 2222,
        required: true,
      })
      amount: number;

      @ApiProperty({
        description: `Enter date Employee financial transaction added => 'Advance','Future_Payment`,
        example: "Advance",
        required: true,
      })
      @IsEnum(['Advance','Future_Payment'])
      transaction_type: string;

      @ApiProperty({
        description: 'Enter date Employee financial transaction added ',
        example: '2022-08-01',
        required: true,
      })
      transaction_date: string;

      @ApiProperty({
        description: 'Enter the policy entered during financial transaction ',
        example: 'reason ABC',
        required: true,
      })
      return_policy: string;
}