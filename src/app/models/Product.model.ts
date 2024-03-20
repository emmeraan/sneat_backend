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
import { Vendor } from './Vendor.model';
import { Platform } from './Platform.model';
  
  @Table({
    tableName: 'products',
    paranoid: true,
  })
  export class Product extends Model {
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
    name: string;
  
    @Column
    price: string;

    @Column
    description: string
    
    @Column
    stockQuantity: number

    @ForeignKey(() => Vendor)
    @Column
    vendor_id: number
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;

    @BelongsTo(()=>Platform)
  platform:Platform
  
    @DeletedAt
    @Column({ type: DataType.DATE })
    deletedAt: Date;

    @BelongsTo(() => Vendor)
    vendor: Vendor;
  }
  