import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
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
import { Platform } from './Platform.model';
import { Department } from './Department.model';
import { Position } from './Position.model';

@Table({
  tableName: 'users',
  paranoid: true,
})
export class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Platform)
  @Column({
      allowNull: false,
    })
  platform_id: number;

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
  cnic:string

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

  @ForeignKey(() => Department)
  @Column
  department_id: number;

  @ForeignKey(() => Position)
  @Column
  position_id: number;

  @Column
  join_date:Date

  @BelongsTo(()=>Platform)
  platform:Platform
  
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

  @BelongsTo(() => Department)
  department: Department;

  @BelongsTo(() => Position)
  position: Position;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  @Column({ type: DataType.DATE })
  deletedAt: Date;
}
