import {
    Controller,
    UseGuards,
    Body,
    Post,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';
import { CreateDepartmentDto } from 'src/app/dtos/departments/CreateDepartment.dto';
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
  data.admin_id = authUser.id; // Assign admin_id from authUser
  let res = await this.departmentService.createDepartment(
    data,
    authUser,
  );
  return res;
}

  }
  