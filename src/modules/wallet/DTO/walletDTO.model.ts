import { v4 as uuidv4 } from 'uuid';

export class WalletDTO {
  accountId: uuidv4;

  investmentValue: number;

  actualValue: number;

  totalEarnings: number;

  constructor(accountId, investmentValue, actualValue, totalEarnings) {
    this.accountId = accountId;
    this.investmentValue = investmentValue;
    this.actualValue = actualValue;
    this.totalEarnings = totalEarnings;
  }
}
