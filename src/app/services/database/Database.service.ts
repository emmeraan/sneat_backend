import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from 'src/app/models/Customer.model';
import { User } from 'src/app/models/User.model';
import { Vendor } from 'src/app/models/Vendor.model';
import { ModelNames } from 'src/app/models/index.model';
import { Platform } from 'src/app/models/Platform.model';
import { Position } from 'src/app/models/Position.model';
import { Attendence } from 'src/app/models/Attendence.model';
import { Salary } from 'src/app/models/Salary.model';
import { Deduction } from 'src/app/models/Deduction.model';
import { Payroll } from 'src/app/models/Payroll.model';
import { FinancialTransaction } from 'src/app/models/FinancialTransactions.model';
import { Department } from 'src/app/models/Department.model';

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
    @InjectModel(FinancialTransaction) private readonly financialTransaction: FinancialTransaction, 
    @InjectModel(Platform) private readonly platform: Platform,
    @InjectModel(Department) private readonly department: Department,
    @InjectModel(Position) private readonly position: Position,
  ) {    
    for (const index in ModelNames) {
      this.Models[ModelNames[index]] = this[ModelNames[index].charAt(0).toLowerCase() + ModelNames[index].slice(1)]
    }
  }
}
