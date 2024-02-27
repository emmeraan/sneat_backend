import { DbExistsOptionalValidation } from "./DbExistsOptional.validation";
import { DbExistsValidation } from "./DbExists.validation";
import { ParseJsonValidation } from "./ParseJson.validation";

export const Validations = [
  DbExistsValidation,
  DbExistsOptionalValidation,
  ParseJsonValidation
]