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
  import { Platform } from './Platform.model';
import { User } from './User.model';
import { Department } from './Department.model';
  
  @Table({
    tableName: 'positions',
    // paranoid: true,
  })
  export class Position extends Model {
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

    @Column({
      allowNull: false,
    })
    @ForeignKey(() => Department)
    department_id: number;

    @Column
    name: string;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  
    // @DeletedAt
    // @Column({ type: DataType.DATE })
    // deletedAt: Date;

    @BelongsTo(()=>Platform)
    platform:Platform

    @BelongsTo(()=>Department)
    department:Department


    @HasMany(() => User)
    user: User;
  
  }
  