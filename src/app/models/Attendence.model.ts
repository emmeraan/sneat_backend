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
  tableName: 'attendence',
  paranoid: true,
})
export class Attendence extends Model {
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
  checkin: Date;

  @Column
  checkout: Date;

  @Column({
    type: DataType.ENUM,
    values: ['Present', 'Absent','Leave'],
  })
  status: 'Present'| 'Absent'|'Leave';

  @Column({
    type: DataType.ENUM,
    values: ['Paid', 'UnPaid'],
  })
  leave_type: 'Paid' | 'UnPaid'

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
