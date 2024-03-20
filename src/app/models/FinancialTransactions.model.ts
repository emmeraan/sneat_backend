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

  @Table({
    tableName: 'Financial_transaction',
    paranoid: true,
  })
  export class FinancialTransaction extends Model {
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
    @Column
    employee_id: number;

    @Column
    amount: number;

    @Column({
      type: DataType.ENUM,
      values: ['Advance', 'FuturePayment'],
    })
    transaction_type: 'Advance' | 'FuturePayment';

    @Column
    transaction_date : Date;

    @Column({
      type: DataType.ENUM,
      values: ['Cash_payment', 'Salary_deduction'],
    })
    return_policy: 'Cash_payment' | 'Salary_deduction';

    @Column
    remaining_amount : number;

    @Column
    Loan_manager: string;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(()=>Platform)
    platform:Platform
  
    @DeletedAt
    @Column({ type: DataType.DATE })
    deletedAt: Date;
  
    @BelongsTo(() => User)
    user: User;
  }