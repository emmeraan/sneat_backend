import {
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    ForeignKey,
    Model,
    Table,
    UpdatedAt,
  } from 'sequelize-typescript';
  import { User } from './User.model';
import { Platform } from './Platform.model';
import { FinancialTransaction } from './FinancialTransactions.model';
  
  @Table({
    tableName: 'deductions',
    paranoid: true,
  })
  export class Deduction extends Model {
    @Column({
      primaryKey: true,
      type: DataType.INTEGER,
      allowNull: false,
      autoIncrement: true,
    })
    id: number;

    @Column({
      allowNull: false,
    })
    @ForeignKey(() => Platform)
    platform_id: number;
  
    @ForeignKey(() => User)
    @Column({
      allowNull: false,
    })
    employee_id: number;

    @ForeignKey(() => FinancialTransaction)
    @Column
    transaction_id: number;
  
    @Column
    deduction_type: string;

    @Column
    transaction_amount:number

    @Column
    deduction_amount:number;

    @Column
    date: Date;

    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    @Column({ type: DataType.DATE })
    deletedAt: Date;

    @BelongsTo(()=>Platform)
    platform:Platform

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => FinancialTransaction)
    financialTransaction: FinancialTransaction;
  }
  