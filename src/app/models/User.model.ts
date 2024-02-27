import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
  paranoid: true,
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
  username: string;

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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @DeletedAt
  @Column({ type: DataType.DATE })
  deletedAt: Date;
}
