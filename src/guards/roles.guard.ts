import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../modules/auth/enum/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const test = requiredRoles.some((role) => user.roles?.includes(role));
    if (!test) {
      throw new UnauthorizedException('Você não tem permissão para realizar esta ação');
    }
    return test;
  }
}
