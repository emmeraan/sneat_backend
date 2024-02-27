
import { Controller, Post, Body, Put, Query, Get, Res, } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Response } from "express";
import { ForgotPassDto } from "src/app/dtos/ForgotPass.dto";
import { OtpVerificationDto } from "src/app/dtos/OtpVerification.dto";
import { PassChangeDto } from "src/app/dtos/PassChange.dto";
import { ForgetPasswordService } from "src/app/services/auth/ForgetPassword.service"
import { hashPassword } from "src/app/utils/auth/bcrypt";
import { AuthUser } from "src/app/utils/decorators/AuthUser.decorator";



@ApiTags('Forget Password  and change')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller()

export class ForgetPasswordController {
    constructor(private readonly forgetPasswordService: ForgetPasswordService) { }

    @Post('forgetpassword')
    @ApiOperation({ summary: 'By hiting this api user will recive an email where OTP will mentioned, put that OTP in password cahnge api to change password ' })
    async forgetpassword(
        @Body() body:ForgotPassDto,
        @Res() res:Response
    ) {
        const a = await this.forgetPasswordService.forgetpassword(body,res)
        return a
    }


    @Post('passowrd_change')
    @ApiOperation({ summary: 'This is password change api hti it after receiving email otp' })
    async changePassword(
      @Body() changePass: PassChangeDto,
      @Res() res:Response
    ) {
      const resp = await this.forgetPasswordService.changePassword(changePass,res)
      return resp
    }

    @Put('otp_verification')
    @ApiOperation({ summary: 'Otp verification api. ' })
    async otpVerification(
      @Body() body:OtpVerificationDto,
      @Res() res:Response
    )
    {
      let resp = await this.forgetPasswordService.otp_varification(body,res)
      return res
    }

    // @ApiBearerAuth()
    // @Post('code_verified')
    // @ApiOperation({ summary: 'verifying code api' })
    // async codeVerified(
    //   @Query('code') code: number,
    //   @Query('email') email: string,
    //   @Query('platform_id') platform_id: number

    // ) {
    //   const res = await this.forgetPasswordService.codeVerified(email, platform_id)
    //   if (res.f_code == code) {
    //     return ({
    //       status: 'true',
    //       message: 'Code match successfully'
    //     })
    //   }
    //   else {
    //     return ({
    //       status: 'false',
    //       message: 'The code you entered is incorrect please try again'
    //     })
    //   }
    // }
}