import {
  Controller,
  Get,
  UseGuards,
  Put,
  Query,
  Body,
  Res,
  Post,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateEmployeeDto } from 'src/app/dtos/employee/CreateEmployee.dto';
import { UpdateEmployeeDto } from 'src/app/dtos/employee/UpdateEmployee.dto';
import { AddSalaryDto } from 'src/app/dtos/salary/AddSalary.dto';
import { EmployeeService } from 'src/app/services/employee/Employee.service';
import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';
import { AuthUser } from 'src/app/utils/decorators/AuthUser.decorator';

@ApiTags('Employee CRUD')
@UseGuards(AuthJwtGuard)
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}
  @Get('all')
  @ApiQuery({
    name: 'page',
    description: 'Enter page number',
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Enter limit,number of record you want to display',
    required: true,
  })
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  async viewusers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('search') search: string,
    @AuthUser() authUser,
  ) {
    console.log(page,limit,search);
    let res = await this.employeeService.all(
      page,
      limit,
      search,
      authUser,
    );
    return res;
  }
  @Post('create')
  async adminUserCreate(@Body() data: AddSalaryDto, @AuthUser() authUser) {
    let res = await this.employeeService.create(
      data,
      authUser,
    );
    return res;
  }
  @Delete('delete')
  @ApiBody({
      schema: {
        type: 'object',
        properties: {
          id: { type: 'number',
          example:"1" }
        },
      },
    })
  async Delete(
      @Body() data:string,
      @AuthUser() authUser
  )
  {
      let res=await this.employeeService.delete(data,authUser);
      return res
  }
  @Put('update')
  async adminUserUpdate(
      @Body()data:UpdateEmployeeDto,
      @AuthUser() authUser
  )
  {
      let res=await this.employeeService.update(data,authUser);
      return res
  }

  @Get('view')
  async viewUser(
      @Query('id')id:number,
      @AuthUser() AuthUser
  ){
      let res=await this.employeeService.view(id,AuthUser)
      return res
  }
}
