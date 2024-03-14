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
  
  enum TransactionType {
    DEBIT = 'debit',
    CREDIT = 'credit',
    TRANSFER = 'transfer',
  }

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
  
    @ForeignKey(() => User)
    @Column
    employee_id: number;

    @Column
    amount: number;

    @Column({
      type: DataType.ENUM,
      values: ['Advance', 'FuturePayment'],
    })
    transaction_type: TransactionType;

    @Column
    transaction_date : Date;

    @Column
    remaining_balance :number
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  
    @DeletedAt
    @Column({ type: DataType.DATE })
    deletedAt: Date;
  
    @BelongsTo(() => User)
    user: User;
  }