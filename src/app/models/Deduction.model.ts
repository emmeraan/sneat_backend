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
  
    @ForeignKey(() => User)
    @Column
    employee_id: number;
  
    @Column
    deduction_type: string;

    @Column
    amount: number;

    @Column
    start_date: Date;

    @Column
    end_date: Date;
  
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
  