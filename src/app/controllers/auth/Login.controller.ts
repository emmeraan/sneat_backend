
import { MailerService } from "@nestjs-modules/mailer";
import { Controller, Get, Query,Req,Post, Body, UseGuards, Res } from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { GetLoginDto } from "src/app/dtos/GetLogin.dto";
import { LoginService } from "src/app/services/auth/Login.service";
import { Response } from 'express';


@ApiTags('Login')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
@Controller()

export class LoginController {
  constructor(private readonly loginService: LoginService) { }


  @Post('login')
  @ApiOperation({ summary: 'Login with registered user' })
  async user(
    @Body() getLogin: GetLoginDto,
    @Res() res: Response
  ) {
    const resp:any = await this.loginService.login(getLogin,res)
    if (resp) {
      return resp
    }
  }

  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async googleLogin() {}

  // @Get('google/callback')
  // @UseGuards(AuthGuard('google'))
  // async googleLoginCallback(@Req() req: Request) {
  //   return req.user;
  // }
}