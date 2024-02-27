import { Controller, Get,UseGuards,Put,Query,Body,Res} from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Response } from "express";
import { EditProfileDto } from "src/app/dtos/EditProfile.dto";
import { UserService } from "src/app/services/user/User.service";
import { AuthJwtGuard } from "src/app/utils/auth/guards/AuthJwt.guard";
import { AuthUser } from "src/app/utils/decorators/AuthUser.decorator";


@ApiTags('User')
@UseGuards(AuthJwtGuard)
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller()
export class UserController{
    constructor(private readonly userService:UserService){}
  

    @Get('userprofile')
    @ApiOperation({ summary: 'User profile api data'})
    async userProfile(
        @AuthUser() authUser,
        @Res() res:Response
    )
    {
     let resp = await this.userService.userProfile(authUser,res)  
     return resp 
    }

    @Put('updateuser')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiResponse({ status: 200, description: 'success' })
    @ApiOperation({ summary: 'This API is to update user information except user email and password' })
    async EditProfile(
        @Body() editProfile: EditProfileDto,
        @AuthUser() authUser,
        @Res() res:Response
    ) {
        console.log(authUser)
        let resp = await this.userService.EditProfile(editProfile,authUser,res)
        return (resp)
    }
}
