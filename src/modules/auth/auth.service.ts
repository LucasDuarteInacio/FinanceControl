import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';
import { account } from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const isMatch = await bcrypt.compare(password, hash);

    const account = await this.accountService.findByEmail(email);
    if (account && isMatch) {
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

    const saltOrRounds = 10;
    account.password = await bcrypt.hash(account.password, saltOrRounds);

    return this.accountService.newAccount(account);
  }
}
