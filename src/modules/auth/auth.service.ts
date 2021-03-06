import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../account/account.service';

import * as bcrypt from 'bcrypt';
import { AccountDTO } from '../account/DTO/accountDTO.model';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(private accountService: AccountService, private jwtService: JwtService, private mailerService: MailerService) {}

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
    const payload = { firstName: account.firstName, lastName: account.lastName, email: account.email, sub: account.accountId, roles: [account.role] };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(account): Promise<AccountDTO> {
    account.role = 'default';

    const saltOrRounds = 10;
    account.password = await bcrypt.hash(account.password, saltOrRounds);

    const accountCreated: AccountDTO = await this.accountService.newAccount(account);

    const mail = {
      to: account.email,
      from: 'noreply@gerenciadordeinvestimentos.com',
      subject: 'Email de confirmação',
      template: 'default',
      context: {
        title: 'Bem vindo!',
        subTitle: 'A plataforma de gerenciamento de Investimentos',
      },
    };
    //await this.mailerService.sendMail(mail);
    return accountCreated;
  }
}
