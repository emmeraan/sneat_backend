import {
    Body,
    Controller,
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
import { AddProductDto } from 'src/app/dtos/product/AddProduct.dto';
import { CreateVendorDto } from 'src/app/dtos/vendor/CreateVendor.dto';
import { ProductService } from 'src/app/services/product/AddProduct.service';
import { VendorService } from 'src/app/services/vendor/Vendor.service';
  import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';

  @ApiTags('Product')
@UseGuards(AuthJwtGuard)
@ApiBearerAuth()
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiResponse({ status: 200, description: 'success' })
  @Controller('Product')
  export class ProductController {
    constructor(private readonly productService: ProductService) {}
    @Post('add')
    async add( @Body() addProductDto:AddProductDto ) 
    {
      let res = await this.productService.add(addProductDto);
      return res;
    console.log("check");
    
    }
  }
  