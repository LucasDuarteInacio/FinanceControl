import { Injectable } from '@nestjs/common';
import { AccountService } from '../modules/account/account.service';
import { JwtService } from '@nestjs/jwt';
import { account } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService, private jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const account = await this.accountService.findByEmail(email);
    if (account && account.password === pass) {
      const { password, ...result } = account;
      return result;
    }
    return null;
  }

  async login(user: account) {
    const payload = { firstname: user.firstname, lastname: user.lastname, email: user.email, sub: user.accountid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
