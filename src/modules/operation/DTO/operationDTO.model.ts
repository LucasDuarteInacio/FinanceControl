import { v4 as uuidv4 } from 'uuid';

export class OperationDTO {
  walletid: uuidv4;

  assetid: uuidv4;

  quantity: number;

  tax: number;

  price: number;

  type: string;

  value: number;

  investmentBroker: string;

  currency: string;

  constructor(
    walletid,
    assetid,
    quantity,
    tax,
    price,
    type,
    value,
    investmentBroker,
    currency,
  ) {
    this.walletid = walletid;
    this.assetid = assetid;
    this.quantity = quantity;
    this.price = price;
    this.type = type;
    this.value = value;
    this.investmentBroker = investmentBroker;
    this.currency = currency;
    this.tax = tax;
  }
}