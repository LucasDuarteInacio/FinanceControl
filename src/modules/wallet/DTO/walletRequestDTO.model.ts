import { v4 as uuidv4 } from 'uuid';

export class WalletRequestDTO {
  investmentvalue: number;

  actualvalue: number;

  totalearnings: number;

  userid: uuidv4;

  constructor(investmentvalue, actualvalue, totalearnings, userid) {
    this.investmentvalue = investmentvalue;
    this.actualvalue = actualvalue;
    this.totalearnings = totalearnings;
    this.userid = userid;
  }
}
