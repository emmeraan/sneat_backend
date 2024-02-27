import { Injectable } from "@nestjs/common";
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments  } from "class-validator";
import { DatabaseService } from "../../services/database/Database.service";


@ValidatorConstraint({ name: 'DBModel', async: true })
@Injectable()
export class ParseJsonValidation implements ValidatorConstraintInterface {
  constructor() {}

  async validate(value,args: ValidationArguments) {
    try {
      if(value.hasOwnProperty('value')){
        JSON.parse(value.value)
      }
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} has Invalid Value.`;
  }
}
