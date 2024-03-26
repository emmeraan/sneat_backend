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
    tableName: 'salaries',
    paranoid: true,
  })
  export class Salary extends Model {
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
  
    @ForeignKey(() => User)
    @Column
    employee_id: number;
  
    @Column
    basic: number;

    @Column
    medical_allowence: number;

    @Column
    travel_allowence: number;

    @Column
    bonus: number;

    @Column({
      type: DataType.ENUM,
      values: ['Daily', 'Monthly','Weekly'],
    })
    salary_type: 'Daily' | 'Monthly' | 'Weekly';

    @Column
    start_date: Date;

    @Column
    end_date: Date;
  
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
  