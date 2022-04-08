import { v4 as uuidv4 } from 'uuid';

export class WalletDTO {


    walletid: uuidv4;

    investmentvalue: number;

    actualvalue: number;

    totalearnings: number;


    constructor(walletid, investmentvalue, actualvalue, totalearnings) {
        this.walletid = walletid;
        this.investmentvalue = investmentvalue;
        this.actualvalue = actualvalue;
        this.totalearnings = totalearnings;
    }

}
