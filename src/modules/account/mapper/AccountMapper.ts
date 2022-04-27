import { IAccountMapper } from './IAccountMapper';
import { account } from '@prisma/client';
import { AccountDTO } from '../DTO/accountDTO.model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const objectMapper = require('object-mapper');

export class AccountMapper implements IAccountMapper {
  toAccountDTO(account: account): AccountDTO {
    const map = {
      accountid: 'accountId',
      firstname: 'firstName',
      lastname: 'lastName',
      email: 'email',
      cellphone: 'cellPhone',
      password: 'password',
      birthdate: 'birthDate',
      address: 'address',
      city: 'city',
      postalcode: 'postalCode',
      country: 'country',
      state: 'state',
      cpf: 'cpf',
      role: 'role',
    };

    return objectMapper(account, map);
  }
}
