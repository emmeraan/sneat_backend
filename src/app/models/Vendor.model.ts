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
import { Product } from './Product.model';
import { Platform } from './Platform.model';
import { Attendence } from './Attendence.model';
  
  @Table({
    tableName: 'vendors',
    paranoid: true,
  })
  export class Vendor extends Model {
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
  
    @Column
    email: string;
  
    @Column
    username: string;
  
    @Column
    address: string
  
    @Column
    phone: number;
  
    @Column
    role: number;

    @Column
    status: number;
  
    @Column
    image: string;

    @Column
    country: string;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(()=>Platform)
    platform:Platform

    @DeletedAt
    @Column({ type: DataType.DATE })
    deletedAt: Date;

    @HasMany(() => Product)
    product: Product[];
  }
  