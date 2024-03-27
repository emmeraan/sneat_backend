import {
    Controller,
    UseGuards,
    Body,
    Post,
    Get,
    Query,
    Delete,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';
import { CreateDepartmentDto } from 'src/app/dtos/departments/CreateDepartment.dto';
import { DeleteDepartmentDto } from 'src/app/dtos/departments/DeleteDepartment.dto';
import { ViewAllDepartmentsDto } from 'src/app/dtos/departments/ViewAllDepartments.dto';
import { DepartmentService } from 'src/app/services/department/department.service';
  import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';
  import { AuthUser } from 'src/app/utils/decorators/AuthUser.decorator';
  
  @ApiTags('Department CRUD')
  @UseGuards(AuthJwtGuard)
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'success' })
  @Controller('department')
  export class DepartmentController {
    constructor(private readonly departmentService: DepartmentService) {}

    @Post('create')
async adminDepartmentCreate(@Body() data: CreateDepartmentDto, @AuthUser() authUser) {
  let res = await this.departmentService.createDepartment(
    data,
    authUser,
  );
  return res;
}
@Get('viewalldepartments')
  async viewall( @Query() viewAllDepartmentDto:ViewAllDepartmentsDto, @AuthUser() authUser){
    let res=await this.departmentService.viewAllDepartment(viewAllDepartmentDto,authUser);
    return res
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
      let res=await this.departmentService.delete(data,authUser);
      return res
  }
  }
  