import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
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
import { CreateVendorDto } from 'src/app/dtos/vendor/CreateVendor.dto';
import { VendorService } from 'src/app/services/vendor/Vendor.service';
  import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';

  @UseGuards(AuthJwtGuard)
  @ApiTags('Vendor')
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'success' })
  @Controller('Vendor')
  export class VendorController {
    constructor(private readonly vendorService: VendorService) {}
    @Post('add')
    async viewusers( @Body() createVendorDto:CreateVendorDto ) 
    {
      let res = await this.vendorService.add(createVendorDto);
      return res;
    }
  }
  