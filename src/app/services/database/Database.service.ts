import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from 'src/app/models/Customer.model';
import { User } from 'src/app/models/User.model';
import { Vendor } from 'src/app/models/Vendor.model';
import { ModelNames } from 'src/app/models/index.model';

@Injectable()
export class DatabaseService {

  public Models: any = {};

  constructor( 
    @InjectModel(User) private readonly user: User ,
    @InjectModel(Vendor) private readonly vendor: Vendor ,
    @InjectModel(Customer) private readonly customer: Customer ,
  ) {    
    for (const index in ModelNames) {
      this.Models[ModelNames[index]] = this[ModelNames[index].charAt(0).toLowerCase() + ModelNames[index].slice(1)]
    }
  }
}
