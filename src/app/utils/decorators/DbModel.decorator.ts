
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DbModelPipe} from '../pipes/DbModel.pipe';

export const Validation = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().header.Authorization;
  },
);

export const DbModelDecorator = (additionalOptions?: any) => Validation(additionalOptions, DbModelPipe);