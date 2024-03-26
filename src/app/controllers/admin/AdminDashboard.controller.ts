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
import { AdminDashboardService } from 'src/app/services/admin/AdminDashboard.service';
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
    constructor(private readonly adminDashboardService: AdminDashboardService) {}
    
  }
  