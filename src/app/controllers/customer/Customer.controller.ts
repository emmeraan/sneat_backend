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
    ApiResponse,
    ApiTags,
    ApiUnauthorizedResponse,
  } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/app/dtos/customer/CreateCustomer.dto';
import { CustomerService } from 'src/app/services/customer/Customer.service';
  import { AuthJwtGuard } from 'src/app/utils/auth/guards/AuthJwt.guard';

  @UseGuards(AuthJwtGuard)
  @ApiTags('Customer')
  @ApiBearerAuth()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiResponse({ status: 200, description: 'success' })
  @Controller('Customer')
  export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}
    @Post('add')
    async add(@Body()addCustomerDto:CreateCustomerDto) 
    {
        let res = await this.customerService.add(addCustomerDto);
        return res;
    }
  }
  