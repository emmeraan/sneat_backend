import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments  } from "class-validator";
import { DatabaseService } from "../../services/database/Database.service";


@ValidatorConstraint({ name: 'DBModel', async: true })
@Injectable()
export class DbExistsOptionalValidation implements ValidatorConstraintInterface {
  constructor(private DBService: DatabaseService) {}

  async validate(value: number,args: ValidationArguments) {
    try {
      if(value){
        let constraints = args.constraints;
        let column = constraints[1] ?? 'id'
        let where = {}
        where[column] = value
        let check = await this.DBService.Models[constraints[0]].count({ where: where });
        if (!check) {
          return false;
        }
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `Bad Request`;
  }
}
