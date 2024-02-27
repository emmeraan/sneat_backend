import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/app/models/User.model';
import { ModelNames } from 'src/app/models/index.model';

@Injectable()
export class DatabaseService {

  public Models: any = {};

  constructor( 
    @InjectModel(User) private readonly user: User ,
  ) {    
    for (const index in ModelNames) {
      this.Models[ModelNames[index]] = this[ModelNames[index].charAt(0).toLowerCase() + ModelNames[index].slice(1)]
    }
  }
}
