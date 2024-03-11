import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { CreateCustomerDto } from 'src/app/dtos/customer/CreateCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly DB: DatabaseService) {}

  async add(createCustomerDto: CreateCustomerDto) {
    let checkcustomer = await this.DB.Models['Customer'].findOne({
      where:{email:createCustomerDto.email}
    })
    if(checkcustomer){
      return{
        status:false,
        message:`Already exist user with same email address with user name ${checkcustomer.username} `
      }
    }
    let createCustomer = await this.DB.Models['Customer'].create({
      email: createCustomerDto.email,
      username: createCustomerDto.username,
      country: createCustomerDto.country,
    });
    
    if(createCustomer){
      return{
        status:true,
        message:"customer data Added successfully"
      }
    }
    else{
      return{
        status:false,
        message:"Invalid Data"
      }
    }
  }
}
