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

@Table({
  tableName: 'users',
  // paranoid: true,
})
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column
  email: string;

  @Column
  firstname: string;

  @Column
  lastname: string;

  @Column
  DateOfBirth: string

  @Column
  address: string;

  @Column
  phone: number;

  @Column
  cnic:number

  @Column
  password: string;

  @Column
  role: number;

  @Column
  OTP: number;

  @Column
  image: string;

  @Column
  qualification: string
  
  @Column
  city: string

  @Column
  gender:string

  @Column
  employment_Status:string

  @Column
  martial_status:string

  @Column
  position: string;

  @Column
  departement: string;

  @Column
  designation:string

  @Column
  join_date:Date
  
  @HasMany(() => Attendence)
  attendence: Attendence;

  @HasMany(() => Deduction)
  deduction: Deduction;

  @HasMany(() => Salary)
  salary: Salary;

  @HasMany(() => Payroll)
  payroll: Payroll;

  @HasMany(() => FinancialTransaction)
  financialTransaction: FinancialTransaction;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  @Column({ type: DataType.DATE })
  deletedAt: Date;
}
