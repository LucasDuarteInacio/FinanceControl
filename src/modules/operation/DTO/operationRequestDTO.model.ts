import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { currencyEnumArray } from '../enum/currency.enum';
import { typeEnumArray } from '../enum/type.enum';

export class OperationRequestDTO {
  @IsNotEmpty({ message: 'Campo idCarteira nao pode ser vazio' })
  @ApiProperty({
    example: '7696d3e0-5b6d-45e3-a59f-d11d82342412',
    description: 'Id da carteira',
  })
  walletid: string;

  @IsNotEmpty({ message: 'Campo idAtivo nao pode ser vazio' })
  @ApiProperty({
    example: '3cee7bc0-0c11-4c0c-b28b-3d14778c439c',
    description: 'Id do ativo',
  })
  assetid: string;

  @IsNumber({}, { message: 'Formato quantidade incorreto' })
  @IsNotEmpty({ message: 'Campo quantidade nao pode ser vazio' })
  @ApiProperty({ example: '10', description: 'quantidade' })
  quantity: number;

  @IsNumber({}, { message: 'Formato taxa incorreto' })
  @IsNotEmpty({ message: 'Campo taxa nao pode ser vazio' })
  @ApiProperty({ example: '9.77', description: 'taxa' })
  tax: number;

  @IsNumber({}, { message: 'Formato preço incorreto' })
  @IsNotEmpty({ message: 'Campo preço nao pode ser vazio' })
  @ApiProperty({ example: '12.15', description: 'preço' })
  price: number;

  @IsNotEmpty({ message: 'Campo tipo nao pode ser vazio' })
  @ApiProperty({
    example: 'Compra',
    description: 'Tipo de operação',
    enum: typeEnumArray,
  })
  type: string;

  @IsNumber({}, { message: 'Formato valor incorreto' })
  @IsNotEmpty({ message: 'Campo valor nao pode ser vazio' })
  @ApiProperty({ example: '121.50', description: 'Valor do ativo' })
  value: number;

  @IsNotEmpty({ message: 'Campo corretora nao pode ser vazio' })
  @ApiProperty({ example: 'Modal Mais', description: 'Corretora' })
  investmentbroker: string;

  @IsNotEmpty({ message: 'Campo moeda nao pode ser vazio' })
  @ApiProperty({
    example: 'BRL',
    description: 'ISO 4217 da moeda usada na operação',
    enum: currencyEnumArray,
  })
  currency: string;

  constructor(walletid, assetid, quantity, tax, price, type, value, investmentbroker, currency) {
    this.walletid = walletid;
    this.assetid = assetid;
    this.quantity = quantity;
    this.price = price;
    this.type = type;
    this.value = value;
    this.investmentbroker = investmentbroker;
    this.currency = currency;
    this.tax = tax;
  }
}
