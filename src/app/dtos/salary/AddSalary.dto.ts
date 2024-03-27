import { ApiProperty } from "@nestjs/swagger";
import { CreateEmployeeDto } from "../employee/CreateEmployee.dto";
import { IsEnum, IsNumber, IsString } from "class-validator";

export class AddSalaryDto extends CreateEmployeeDto{
    @ApiProperty({
        description: 'Enter salary of employee',
        example: 100,
        required: true,
      })
      @IsNumber()
      basic: number;

      // @ApiProperty({
      //   description: 'Enter medical allowence if any of employee',
      //   example: 100,
      //   required: false,
      // })
      // @IsNumber()
      // medical_allowence: number;

      // @ApiProperty({
      //   description: 'Enter travel allowence if any of employee',
      //   example: 100,
      //   required: false,
      // })
      // @IsNumber()
      // travel_allowence: number;

      // @ApiProperty({
      //   description: 'Enter medical allowence if any of employee',
      //   example: 100,
      //   required: false,
      // })
      // @IsNumber()
      // bonus: number;

      @ApiProperty({
        description: 'Salary type of employee',
        example: 'Monthly',
        required: true,
      })
      @IsEnum(['Monthly','Weekly','Daily'])
      salary_type:string
}