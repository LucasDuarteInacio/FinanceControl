import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AccountRequestDTO {
  @IsNotEmpty({ message: 'Campo nome nao pode ser vazio' })
  @ApiProperty({ example: 'Lucas', description: 'First username' })
  firstname: string;

  @IsNotEmpty({ message: 'Campo sobrenome nao pode ser vazio' })
  @ApiProperty({ example: 'Duarte', description: 'Last username' })
  lastname: string;

  @IsEmail({}, { message: 'Formato email incorreto' })
  @IsNotEmpty({ message: 'Campo email nao pode ser vazio' })
  @ApiProperty({
    example: 'lucasduarte@email.com',
    description: 'Account email',
  })
  email: string;

  @IsNotEmpty({ message: 'Campo Telefone nao pode ser vazio' })
  @ApiProperty({ example: '31999999999', description: 'Account cell phone' })
  cellphone: string;

  @IsNotEmpty({ message: 'Campo senha nao pode ser vazio' })
  @ApiProperty({ example: 'password', description: 'Account password' })
  password: string;

  @IsNotEmpty({ message: 'Campo data aniversario nao pode ser vazio' })
  @ApiProperty({
    example: '2022-04-14T00:00:00.000Z',
    description: 'Account birthday',
  })
  birthdate: Date;

  @ApiProperty({ example: 'Rua hum', description: 'Account  address' })
  address: string;

  @ApiProperty({ example: 'Betim', description: 'Account city' })
  city: string;

  @ApiProperty({ example: '32671199', description: 'Account postal code' })
  postalcode: string;

  @ApiProperty({ example: 'brasil', description: 'Account country' })
  country: string;

  @ApiProperty({ example: 'Minas Gerais', description: 'Account state' })
  state: string;

  @IsNotEmpty({ message: 'Campo cpf nao pode ser vazio' })
  @ApiProperty({ example: '37271448071', description: 'Account cpf' })
  cpf: string;

  constructor(
    firstname,
    lastname,
    email,
    cellphone,
    password,
    birthdate,
    address,
    city,
    postalcode,
    country,
    state,
    cpf,
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.cellphone = cellphone;
    this.password = password;
    this.birthdate = birthdate;
    this.address = address;
    this.city = city;
    this.postalcode = postalcode;
    this.country = country;
    this.state = state;
    this.cpf = cpf;
  }
}
