import {
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    Model,
    Table,
    UpdatedAt,
  } from 'sequelize-typescript';
  
  @Table({
    tableName: 'customers',
    paranoid: true,
  })
  export class Customer extends Model {
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
  }
  