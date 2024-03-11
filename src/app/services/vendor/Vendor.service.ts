import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DatabaseService } from '../database/Database.service';
import { CreateVendorDto } from 'src/app/dtos/vendor/CreateVendor.dto';

@Injectable()
export class VendorService {
  constructor(private readonly DB: DatabaseService) {}
  async add( createVendorDto: CreateVendorDto) {
    console.log(createVendorDto.email);
    let checkvendor = await this.DB.Models['Vendor'].findOne({
      where:{email:createVendorDto.email}
    })
    if(checkvendor){
      return{
        status:false,
        message:`Already exist user with same email address with user name ${checkvendor.username} `
      }
    }
    let createVendor = await this.DB.Models['Vendor'].create({
      email: createVendorDto.email,
      username: createVendorDto.username,
      country: createVendorDto.country,
    });
    
    if(createVendor){
      return{
        status:true,
        message:"Vendor data Added successfully"
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
