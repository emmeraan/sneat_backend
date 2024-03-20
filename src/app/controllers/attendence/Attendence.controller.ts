import {
    UseGuards,
    Body,
    Post,
    Controller,
    Get,
    Query,
    Put,
  } from '@nestjs/common';
  import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';
import { AddAttendenceDto } from "src/app/dtos/attendence/AddAttendence.dto";
import { UpdateAttendenceDto } from 'src/app/dtos/attendence/UpdateAttendence.dto';
import { ViewAttendenceDto } from 'src/app/dtos/attendence/ViewAttendence.dto';
import { AttendenceService } from "src/app/services/attendence/Attendence.service";
import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';
import { AuthUser } from "src/app/utils/decorators/AuthUser.decorator";

@ApiTags('Employee Attendence')
@UseGuards(AuthJwtGuard)
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller('attendence')
export class AttendenceController{
    constructor(private readonly attendenceService:AttendenceService){}
    @Post('add')
  async adminUserCreate(@Body() addAttendenceDto: AddAttendenceDto, @AuthUser() authUser) {
    let res = await this.attendenceService.addAttendence(
      addAttendenceDto,authUser
    );
    return res;
  }

  @Get('view')
  async view( @Query() viewAttendenceDto:ViewAttendenceDto, @AuthUser() authUser){
    let res=await this.attendenceService.view(viewAttendenceDto,authUser);
    return res
  }

  @Put('update')
  async update(@Body() updateAttendenceDto: UpdateAttendenceDto, @AuthUser() authUser) {
    let res = await this.attendenceService.update(
      updateAttendenceDto,authUser
    );
    return res;
  }
}