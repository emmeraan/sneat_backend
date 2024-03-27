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
import { Position } from './Position.model';
  
  @Table({
    tableName: 'departments',
    // paranoid: true,
  })
  export class Department extends Model {
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
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  
    // @DeletedAt
    // @Column({ type: DataType.DATE })
    // deletedAt: Date;

    @BelongsTo(()=>Platform)
    platform:Platform

    @HasMany(() => User)
    user: User;

    @HasMany(() => Position)
    position: Position;
  
  }
  