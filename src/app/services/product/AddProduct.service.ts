import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { Op } from 'sequelize';
import { PaginationHelper } from 'src/app/utils/helpers/Pagination.helper';
import { hashPassword } from 'src/app/utils/auth/bcrypt';

@Injectable()
export class ProductService {
  constructor(private readonly DB: DatabaseService) {}
  async add(addProductDto) {
    console.log("check",addProductDto);
    
  }
}
