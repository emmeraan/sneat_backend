import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FinancialTransaction } from 'src/app/models/FinancialTransactions.model';
import { Attendence } from 'src/app/models/Attendence.model';
import { Customer } from 'src/app/models/Customer.model';
import { Deduction } from 'src/app/models/Deduction.model';
import { Payroll } from 'src/app/models/Payroll.model';
import { Salary } from 'src/app/models/Salary.model';
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
    @InjectModel(Attendence) private readonly attendence: Attendence,
    @InjectModel(Salary) private readonly salary: Salary,
    @InjectModel(Deduction) private readonly deduction: Deduction,
    @InjectModel(Payroll) private readonly payroll: Payroll, 
    @InjectModel(Payroll) private readonly financialTransactions: FinancialTransaction, 
  ) {    
    for (const index in ModelNames) {
      this.Models[ModelNames[index]] = this[ModelNames[index].charAt(0).toLowerCase() + ModelNames[index].slice(1)]
    }
  }
}
