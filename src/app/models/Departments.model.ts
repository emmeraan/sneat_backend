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
  import { Platform } from './Platform.model';
import { User } from './User.model';
  
  @Table({
    tableName: 'departments',
    paranoid: true,
  })
  export class Departments extends Model {
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
    admin_id: number;

  
    @Column
    name: string;

    @Column
    location: string;

    @Column
    department_head:string;
  
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
  
  }
  