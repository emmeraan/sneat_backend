import { PipeTransform, Injectable, BadRequestException, Inject, ArgumentMetadata } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DatabaseService } from '../../services/database/Database.service';


@Injectable()
export class DbModelPipe implements PipeTransform<any> {
    constructor(private db: DatabaseService,@Inject(REQUEST) private req: any) { }
    async transform(value: any, metadata) {
      let column = metadata.data[2] ? metadata.data[2] : 'id';
      let type = !metadata.data[3] ? 'params' : metadata.data[3];
      if(!this.req[type][metadata.data[0]]){
        throw new BadRequestException("Bad Request");
      }
      const isExists = await this.db.Models[metadata.data[1]].findOne(
        {
          where: { 
            [ column ] : this.req[type][metadata.data[0]]
          }
        }
      );
      if (!isExists) {
        throw new BadRequestException("Bad Request");
      }
      return isExists
    }
}