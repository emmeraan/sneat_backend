
import { Controller, Get,Post, Query, UseGuards } from "@nestjs/common";
import {  ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthUser } from "src/app/utils/decorators/AuthUser.decorator";
import { LogoutService } from "src/app/services/auth/Logout.service";
import { AuthJwtGuard } from "src/app/utils/auth/guards/AuthJwt.guard";


@ApiTags('Logout')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiResponse({ status: 200, description: 'success' })
@Controller()
export class LogoutController {
    constructor(private readonly usersService:LogoutService) { }

    // @Post('getlogout')
    // @ApiOperation({ summary: 'Logout api' })
    // async logout(
    //   @Query('id') id: number,
    //   @Query('platform_id') platform_id: number,
    //   @Query('email') email: string,
    //   @Query('token') token: string,
    // ) {
    //   const res = await this.usersService.logout(id,platform_id,email,token)
    //   return res
    // }
  
}