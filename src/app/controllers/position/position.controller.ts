import {
  Controller,
  UseGuards,
  Body,
  Post,
  Get,
  Query,
  Delete,
  Put,
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
import { CreatePositionDto } from 'src/app/dtos/position/CreatePosition.dto';
import { DeletePositionDto } from 'src/app/dtos/position/DeletePosition.dto';
import { UpdatePositionDto } from 'src/app/dtos/position/UpdatePosition.dto';
import { ViewPositionDto } from 'src/app/dtos/position/ViewPositon.dto';
import { DepartmentService } from 'src/app/services/department/department.service';
import { PositionService } from 'src/app/services/position/position.service';
import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';
import { AuthUser } from 'src/app/utils/decorators/AuthUser.decorator';

@ApiTags('Position CRUD')
@UseGuards(AuthJwtGuard)
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post('create')
  async adminDepartmentCreate(
    @Body() createPositionDto: CreatePositionDto,
    @AuthUser() authUser,
  ) {
    let res = await this.positionService.createPosition(createPositionDto, authUser);
    return res;
  }
  @Get('all')
  async all(@Query() viewPositionDto: ViewPositionDto, @AuthUser() authUser) {
    let res = await this.positionService.all(viewPositionDto, authUser);
    return res;
  }
  @Delete('delete')
  async delete(
    @Body() deletePositionDto: DeletePositionDto,
    @AuthUser() authUser,
  ) {
    let response = await this.positionService.delete(
      deletePositionDto,
      authUser,
    );
    return response;
  }
  @Put('update')
  async update(
    @Body() updatePositionDto: UpdatePositionDto,
    @AuthUser() authUser,
  ) {
    let response = await this.positionService.update(
      updatePositionDto,
      authUser,
    );
    return response;
  }
}
