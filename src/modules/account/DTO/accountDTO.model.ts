import { WalletDTO } from '../../wallet/DTO/walletDTO.model';
import { v4 as uuidv4 } from 'uuid';

export class AccountDTO {
  accountId: uuidv4;

  firstName: string;

  lastName: string;

  email: string;

  cellPhone: string;

  password: string;

  birthDate: Date;

  address: string;

  city: string;

  postalCode: string;

  country: string;

  state: string;

  cpf: string;

  wallet: WalletDTO;

  constructor(accountId, firstName, lastName, email, cellPhone, password, birthDate, address, city, postalCode, country, state, cpf, wallet) {
    this.accountId = accountId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.cellPhone = cellPhone;
    this.password = password;
    this.birthDate = birthDate;
    this.address = address;
    this.city = city;
    this.postalCode = postalCode;
    this.country = country;
    this.state = state;
    this.cpf = cpf;
    this.wallet = wallet;
  }
}
