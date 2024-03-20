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
    tableName: 'payrolls',
    paranoid: true,
  })
  export class Payroll extends Model {
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
    
    @Column
    deduction_type: string;

    @Column
    transaction_date: Date;
  
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
  