import { DynamicModule, Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize/types';
import { Models } from '../../models/index.model';
require('dotenv').config()

@Module({})
export class DatabaseModule {
  static async forRoot(): Promise<DynamicModule> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      module: DatabaseModule,
      imports: [
        SequelizeModule.forRoot({
            dialect: <Dialect> process.env.DATABASE_DIALECT,
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: true,
            autoLoadModels: true,
            query:{
                raw:true, 
            },
            // sync: {
            //   alter: true, // Use alter: true for Sequelize alter mode
            //   force: false, // Set to false to prevent dropping tables
            // },
            models: Models,
        }),
        KnexModule.forRoot({
          config: {
            client: 'mysql2',
            connection: {
              host: process.env.DATABASE_HOST,
              port: parseInt(process.env.DATABASE_PORT),
              user: process.env.DATABASE_USER,
              password: process.env.DATABASE_PASSWORD,
              database: process.env.DATABASE_NAME,
            },
          },
        }),
      ],
    };
  }
}