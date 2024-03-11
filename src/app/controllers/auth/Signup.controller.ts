import { Controller, Get, Post, Put, Query,Res, Body, BadRequestException} from "@nestjs/common";
import { ApiBadRequestResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { EditProfileDto } from "src/app/dtos/EditProfile.dto";
import { SignupDto } from "src/app/dtos/Signup.dto";
import { SignupService } from "src/app/services/auth/Signup.service";

@Controller()
export class SignupController {
    constructor(private readonly signupService: SignupService) { }

    @Post('register')
    @ApiTags('Signup')
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @ApiResponse({ status: 200, description: 'success' })
    @ApiOperation({ summary: 'Register a new user' })
    async Register(
        @Body() signup: SignupDto,
        @Res() res:Response
    ) {
        let resp = await this.signupService.Register(signup,res)
        return resp
    }

}
