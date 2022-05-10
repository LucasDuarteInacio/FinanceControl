import { v4 as uuidv4 } from 'uuid';

export class WalletDTO {
  walletId: uuidv4;

  investmentValue: number;

  actualValue: number;

  totalEarnings: number;

  constructor(walletId, investmentValue, actualValue, totalEarnings) {
    this.walletId = walletId;
    this.investmentValue = investmentValue;
    this.actualValue = actualValue;
    this.totalEarnings = totalEarnings;
  }
}
