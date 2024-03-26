import {
    UseGuards,
    Body,
    Post,
    Put,
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
import { AddCashPaymentDto } from 'src/app/dtos/salary/AddCashPayment.dto';
import { CalculateSalaryDto } from 'src/app/dtos/salary/CalculateSalary.dto';
import { FinancialTransactionDto } from 'src/app/dtos/salary/FinancialTransaction.dto';
import { GetFinancialTransactionDto } from 'src/app/dtos/salary/GetFinancialTransaction.dto';
import { ShowDeductionDto } from 'src/app/dtos/salary/ShowDeduction.dto';
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
    let res = await this.salaryService.addEmployeeFinancialTransaction(
      financialTransactionDto,authUser
    );
    return res;
  }

  @Get('calculatePayroll')
  async view( @Query() calculateSalaryDto:CalculateSalaryDto, @AuthUser() authUser){
    let res=await this.salaryService.calculatePayroll(calculateSalaryDto,authUser)
    return res
  }

  @Get('generatePayroll')
  async generatePayroll( @Query() calculateSalaryDto:CalculateSalaryDto, @AuthUser() authUser){
    let res=await this.salaryService.generatePayroll(calculateSalaryDto,authUser)
    return res
  }
  
  @Put('addPayingBack')
  async addCashPayement(@Body() addCashPayementDto:AddCashPaymentDto,@AuthUser() authUser){
    let res = await this.salaryService.addCashPayement(addCashPayementDto,authUser);
    return res
  }
9
  @Get('financial_transactions')
  async financial_transactions(@Query() showFinancialTransactionDto:GetFinancialTransactionDto,@AuthUser() authUser){
    let response= await this.salaryService.getEmployeeFinancialTransactions(showFinancialTransactionDto,authUser);
    return response;
  }

  @Get('viewdeduction')
  async viewdeduction(@Query() showDeductionDto:ShowDeductionDto,@AuthUser() authUser){
    let response= await this.salaryService.viewdeduction(showDeductionDto,authUser);
    return response;
  }
}