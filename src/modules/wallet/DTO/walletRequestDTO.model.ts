import { v4 as uuidv4 } from 'uuid';

export class WalletRequestDTO {
  investmentvalue: number;

  actualvalue: number;

  totalearnings: number;

  accountid: uuidv4;

  constructor(investmentvalue, actualvalue, totalearnings, accountid) {
    this.investmentvalue = investmentvalue;
    this.actualvalue = actualvalue;
    this.totalearnings = totalearnings;
    this.accountid = accountid;
  }
}
