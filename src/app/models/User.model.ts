import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Attendence } from './Attendence.model';

@Table({
  tableName: 'users',
  // paranoid: true,
})
export class User extends Model {
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
  firstname: string;

  @Column
  lastname: string;

  @Column
  DateOfBirth: string

  @Column
  address: string;

  @Column
  phone: number;

  @Column
  password: string;

  @Column
  role: number;

  @Column
  OTP: number;

  @Column
  image: string;

  @Column
  position: string;

  @Column
  departement: string;

  @HasMany(() => Attendence)
  attendence: Attendence;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  // @DeletedAt
  // @Column({ type: DataType.DATE })
  // deletedAt: Date;
}
