import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments  } from "class-validator";
import { DatabaseService } from "../../services/database/Database.service";


@ValidatorConstraint({ name: 'DbModel', async: true })
@Injectable()
export class DbExistsValidation implements ValidatorConstraintInterface {
  constructor(private DB: DatabaseService) {}

  async validate(value: number,args: ValidationArguments) {
    try {
      let constraints = args.constraints;
      let column = constraints[1] ?? 'id'
      let where = {}
      where[column] = value
      let check = await this.DB.Models[constraints[0]].count({ where: where });
      if (!check) {
        return false;
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
