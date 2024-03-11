import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    HasMany,
    Model,
    Table,
    UpdatedAt,
  } from 'sequelize-typescript';
import { Product } from './Product.model';
  
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
  
    @DeletedAt
    @Column({ type: DataType.DATE })
    deletedAt: Date;

    @HasMany(() => Product)
    product: Product[];
  }
  