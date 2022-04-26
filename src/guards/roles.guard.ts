import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesEnum } from '../modules/auth/enum/roles.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PrismaService } from '../shared/prisma.service';
import { AccountRepository } from '../modules/account/account.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { user, params, headers } = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
    const userId = headers['x-userid'];
    let param, paramValid;

    if (!requiredRoles) {
      return true;
    }
    requiredRoles.push(<RolesEnum>'admin');

    const accountValid = requiredRoles.some((role) => user.roles?.includes(role));
    if (user.roles[0] !== 'admin') {
      if (params && (params.accountId || params.assetId)) {
        params.accountId ? (param = 'account') : (param = 'wallet');
        const user = await this.validateUser(userId);
        if (user) {
          switch (param) {
            case 'account':
              paramValid = params.accountId === user.accountId;
              break;
            case 'wakket':
              paramValid = params.assetId === user.wallet.walletId;
              break;
          }
        }
      }
    }
    if (!paramValid || !accountValid) {
      throw new UnauthorizedException('Você não tem permissão para realizar esta ação');
    }
    return accountValid;
  }

  async validateUser(userId) {
    const prisma: PrismaService = new PrismaService();
    const accountRepository: AccountRepository = new AccountRepository(prisma);
    return await accountRepository.findById(userId);
  }
}
