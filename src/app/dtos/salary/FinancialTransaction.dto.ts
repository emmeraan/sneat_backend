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
        example: '2024-03-01',
        required: true,
      })
      transaction_date: string;

      @ApiProperty({
        description: `Enter the policy of return 'Cash_payment','Salary_deduction' `,
        example: 'Salary_deduction',
        required: true,
      })
      @IsEnum(['Cash_payment','Salary_deduction'])
      return_policy: string;

      @ApiProperty({
        description: 'Enter loan manager ',
        example: 'user1',
        required: true,
      })
      loan_manager: string;

      @ApiProperty({
        description:'Amount percent to be deduct from every Salary',
        example:10,
        required:true
      })
      deduct_percent:number
}