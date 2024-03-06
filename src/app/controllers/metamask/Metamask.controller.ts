import { Controller, Get,UseGuards,Put,Query, Post, Body, Res } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { Response } from "express";
import { MetaMaskDto } from "src/app/dtos/MetaMask.dto";
import { VerifyMetamaskDto } from "src/app/dtos/VerifyMetamask.dto";
import { MetamaskService } from "src/app/services/Metamask.service";



@ApiTags('Metamask')
@Controller()
export class MetaMaskController{
 constructor(private readonly mmService:MetamaskService){}


//  @Post("/nonce")
//  @ApiOperation({ summary: 'post to get user nonce'})
//     async nonce(
//       @Body() metamask:MetaMaskDto,
//       @Res() res:Response
//       ){
//     return await this.mmService.nonce(metamask,res);
//     }

//   @Post('/verify')
//   @ApiOperation({ summary: 'verify your identity'})
//     async verify(
//       @Body() verifyMeta:VerifyMetamaskDto,
//       @Res() res:Response
//       ) {
//     return await this.mmService.verify(verifyMeta,res)
//     }
}