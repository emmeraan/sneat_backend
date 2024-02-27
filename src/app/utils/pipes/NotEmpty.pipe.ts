import { PipeTransform, Injectable, BadRequestException, Inject, ArgumentMetadata } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DatabaseService } from '../../services/database/Database.service';


@Injectable()
export class NotEmptyPipe implements PipeTransform<any> {
    constructor(@Inject(REQUEST) private req: any) { }
    async transform(value: any, metadata) {
      if(value == undefined || value == '' || value == null){
        throw new BadRequestException("Bad Request");
      }
      return value
    }
}