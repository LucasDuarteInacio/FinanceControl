import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../modules/auth/enum/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user, params, headers } = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    const userId = headers['x-userid'];
    if (!requiredRoles) {
      return true;
    }
    requiredRoles.push(<RolesEnum>'admin');


    if (params && (params.accountId || params.assetId)) {
      console.log(params);
      console.log(userId);
    }
    const test = requiredRoles.some((role) => user.roles?.includes(role));
    if (user.roles[0] !== 'admin') {
      console.log(userId);
    }
    if (!test) {
      throw new UnauthorizedException('Você não tem permissão para realizar esta ação');
    }
    return test;
  }
}
