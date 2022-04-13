import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { currencyEnumArray } from '../enum/currency.enum';
import { typeEnumArray } from '../enum/type.enum';

export class OperationRequestDTO {
  @IsNotEmpty({ message: 'Campo idCarteira não pode ser vazio' })
  @ApiProperty({
    example: '7696d3e0-5b6d-45e3-a59f-d11d82342412',
    description: 'Wallet ID',
  })
  walletid: string;

  @IsNotEmpty({ message: 'Campo idAtivo não pode ser vazio' })
  @ApiProperty({
    example: '3cee7bc0-0c11-4c0c-b28b-3d14778c439c',
    description: 'Asset ID',
  })
  assetid: string;

  @IsNumber({}, { message: 'Formato quantidade incorreto' })
  @IsNotEmpty({ message: 'Campo quantidade não pode ser vazio' })
  @ApiProperty({ example: '10', description: 'Quantity' })
  quantity: number;

  @IsNotEmpty({ message: 'Data da operação não pode ser vazia' })
  @ApiProperty({
    example: '2022-04-14T00:00:00.000Z',
    description: 'Date operation',
  })
  date: Date;

  @IsNumber({}, { message: 'Formato taxa incorreto' })
  @IsNotEmpty({ message: 'Campo taxa não pode ser vazio' })
  @ApiProperty({ example: '9.77', description: 'Tax' })
  tax: number;

  @IsNumber({}, { message: 'Formato preço incorreto' })
  @IsNotEmpty({ message: 'Campo preço não pode ser vazio' })
  @ApiProperty({ example: '12.15', description: 'Price' })
  price: number;

  @IsNotEmpty({ message: 'Campo tipo não pode ser vazio' })
  @ApiProperty({
    example: 'Compra',
    description: 'Operation type',
    enum: typeEnumArray,
  })
  type: string;

  @IsNumber({}, { message: 'Formato valor incorreto' })
  @IsNotEmpty({ message: 'Campo valor não pode ser vazio' })
  @ApiProperty({ example: '121.50', description: 'Asset value' })
  value: number;

  @IsNotEmpty({ message: 'Campo corretora não pode ser vazio' })
  @ApiProperty({ example: 'Modal Mais', description: 'Investmentbroker name' })
  investmentbroker: string;

  @IsNotEmpty({ message: 'Campo moeda não pode ser vazio' })
  @ApiProperty({
    example: 'BRL',
    description: 'ISO 4217 of the currency used in the transaction',
    enum: currencyEnumArray,
  })
  currency: string;

  constructor(walletid, assetid, quantity, date, tax, price, type, value, investmentbroker, currency) {
    this.walletid = walletid;
    this.assetid = assetid;
    this.quantity = quantity;
    this.price = price;
    this.type = type;
    this.value = value;
    this.investmentbroker = investmentbroker;
    this.currency = currency;
    this.tax = tax;
    this.date = date;
  }
}
