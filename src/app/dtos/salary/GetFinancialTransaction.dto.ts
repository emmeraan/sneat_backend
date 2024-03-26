import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional } from "class-validator";

export class GetFinancialTransactionDto {
  @ApiProperty({
    description: 'Enter id of employee',
    example: 1,
    required: true,
  })
  employee_id: number;

  @ApiProperty({
    description: 'Enter start date of financial transaction ',
    example: '2024-01-12',
    required: false,
  })
  start: string;

  @ApiProperty({
    description: 'Enter end date of financial transaction  ',
    example: '2024-12-12',
    required: false,
  })
  end: string;

  @ApiProperty({
    description: `Enter the policy of return 'Cash_payment','Salary_deduction' `,
    example: 'Salary_deduction',
    required: false,
  })
  @IsOptional()
  @IsEnum(['Cash_payment', 'Salary_deduction'])
  return_policy: string;
}
