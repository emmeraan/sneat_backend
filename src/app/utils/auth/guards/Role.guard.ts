
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from 'src/app/utils/enums/Role.enum';
import { AuthJwtGuard } from './AuthJwt.guard';
 
const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends AuthJwtGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
 
      const request = context.switchToHttp().getRequest();
      const user = request.user;
 
      return user.role == role;
    }
  }
 
  return mixin(RoleGuardMixin);
}
 
export default RoleGuard;