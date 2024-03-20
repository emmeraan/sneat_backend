import {
    UseGuards,
    Body,
    Post,
    Controller,
    Query,
    Get,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';
import { CalculateSalaryDto } from 'src/app/dtos/salary/CalculateSalary.dto';
import { FinancialTransactionDto } from 'src/app/dtos/salary/FinancialTransaction.dto';
import { SalaryService } from 'src/app/services/salary/Salary.service';
import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';
import { AuthUser } from "src/app/utils/decorators/AuthUser.decorator";

@ApiTags('Employee Salary and Transactions')
@UseGuards(AuthJwtGuard)
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller('salary')
export class SalaryController{
    constructor(private readonly salaryService:SalaryService){}
    @Post('financial_transaction')
  async employeeFinancialTransaction(@Body() financialTransactionDto: FinancialTransactionDto, @AuthUser() authUser) {
    let res = await this.salaryService.employeeFinancialTransaction(
      financialTransactionDto,authUser
    );
    return res;
  }

  @Get('calculateSalary')
  async view( @Query() calculateSalaryDto:CalculateSalaryDto, @AuthUser() authUser){
    let res=await this.salaryService.calculateSalary(calculateSalaryDto,authUser)
    return res
  }
}