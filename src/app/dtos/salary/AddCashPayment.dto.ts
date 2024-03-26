import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";

export class AddCashPaymentDto{
    @ApiProperty({
        description: 'Enter ID of employee',
        example: 1,
        required: true,
      })
      employee_id: number;

      @ApiProperty({
        description: 'Enter salary of employee',
        example: 100,
        required: true,
      })
      amount: number;

      @ApiProperty({
        description: 'Enter date Employee financial transaction added ',
        example: '2024-03-01',
        required: true,
      })
      transaction_date: string;

      @ApiProperty({
        description: `Enter the policy of return 'Cash_payment','Salary_deduction' `,
        example: 'Cash_payment',
        required: true,
      })
      @IsEnum(['Cash_payment','Salary_deduction'])
      return_type: string;

}