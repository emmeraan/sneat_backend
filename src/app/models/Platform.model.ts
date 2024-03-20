import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    HasMany,
    Model,
    Table,
    UpdatedAt,
  } from 'sequelize-typescript';
  import { Attendence } from './Attendence.model';
  import { Deduction } from './Deduction.model';
  import { Salary } from './Salary.model';
  import { Payroll } from './Payroll.model';
  import { FinancialTransaction } from './FinancialTransactions.model';
import { User } from './User.model';
import { Customer } from './Customer.model';
import { Product } from './Product.model';
import { Vendor } from './Vendor.model';
  
  @Table({
    tableName: 'platforms',
    // paranoid: true,
  })
  export class Platform extends Model {
    @Column({
      primaryKey: true,
      type: DataType.INTEGER,
      allowNull: false,
      autoIncrement: true,
    })
    id: number;
  
    @Column
    name: string;
  
    @Column
    logo:string

  
    @HasMany(() => Customer)
    customer: Customer;

    @HasMany(() => Attendence)
    attendence: Attendence;

    @HasMany(() => Deduction)
    deduction: Deduction;

    @HasMany(() => FinancialTransaction)
    financialTransaction: FinancialTransaction;

    @HasMany(() => Payroll)
    payroll: Payroll;

    @HasMany(() => Product)
    product: Product;

    @HasMany(() => Salary)
    salary: Salary;

    @HasMany(() => User)
    user: User;

    @HasMany(() => Vendor)
    vendor: Vendor;

  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  
    @DeletedAt
    @Column({ type: DataType.DATE })
    deletedAt: Date;
  }
  