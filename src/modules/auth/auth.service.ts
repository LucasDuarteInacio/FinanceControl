import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { account } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const account = await this.accountService.findByEmail(email);
    if (account && account.password === pass) {
      return account;
    }
    return null;
  }

  async login(user): Promise<any> {
    const account = await this.accountService.findByEmail(user.email);
    const payload = { firstname: account.firstname, lastname: account.lastname, email: account.email, sub: account.accountid, roles: [account.role] };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(account): Promise<account> {
    account.role = 'default';
    return this.accountService.newAccount(account);
  }
}
