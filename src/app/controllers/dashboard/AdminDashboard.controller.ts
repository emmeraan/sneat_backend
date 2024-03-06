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
import { CreateUserByAdmin } from 'src/app/dtos/dashboard/CreateUser.dto';
import { UpdateUserByAdmin } from 'src/app/dtos/dashboard/UpdateUser.dto';
import { AdminDasboardService } from 'src/app/services/dashboard/AdminDashboard.service';
import { UserService } from 'src/app/services/user/User.service';
import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';
import { AuthUser } from 'src/app/utils/decorators/AuthUser.decorator';

@ApiTags('Admin Dashboard')
@UseGuards(AuthJwtGuard)
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller('adminDashboard')
export class AdminDashboardController {
  constructor(private readonly adminDashboardService: AdminDasboardService) {}
  @Get('viewAllUser')
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
    let res = await this.adminDashboardService.totalUserDisplay(
      page,
      limit,
      search,
      authUser,
    );
    return res;
  }
  @Post('createUserByAdmin')
  async adminUserCreate(@Body() data: CreateUserByAdmin, @AuthUser() authUser) {
    let res = await this.adminDashboardService.adminCreateNewUser(
      data,
      authUser,
    );
    return res;
  }
  // @Delete('deleteUserByAdmin')
  // @ApiBody({
  //     schema: {
  //       type: 'object',
  //       properties: {
  //         id: { type: 'number',
  //         example:'[1,2]' }
  //       },
  //     },
  //   })
  // async adminUserDelete(
  //     @Body()data:string,
  //     @AuthUser() authUser
  // )
  // {
  //     let res=await this.adminDashboardService.adminDeleteUser(data,authUser);
  //     return res
  // }
  // @Put('editUserByAdmin')
  // async adminUserUpdate(
  //     @Body()data:UpdateUserByAdmin,
  //     @AuthUser() authUser
  // )
  // {
  //     let res=await this.adminDashboardService.adminUpdateUser(data,authUser);
  //     return res
  // }

  // @Get('viewUser')
  // async viewUser(
  //     @Query('id')id:number,
  //     @AuthUser() AuthUser
  // ){
  //     let res=await this.adminDashboardService.viewUser(id,AuthUser)
  //     return res
  // }
}
