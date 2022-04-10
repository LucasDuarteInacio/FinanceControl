import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRequestDTO {
  @IsNotEmpty({ message: 'Campo nome nao pode ser vazio' })
  @ApiProperty({ example: 'Lucas', description: 'First username' })
  firstname: string;

  @IsNotEmpty({ message: 'Campo sobrenome nao pode ser vazio' })
  @ApiProperty({ example: 'Duarte', description: 'Last username' })
  lastname: string;

  @IsNotEmpty({ message: 'Campo email nao pode ser vazio' })
  @ApiProperty({ example: 'lucasduarte@email.com', description: 'User email' })
  email: string;

  @IsNotEmpty({ message: 'Campo Telefone nao pode ser vazio' })
  @ApiProperty({ example: '31999999999', description: 'User cell phone' })
  cellphone: string;

  @IsNotEmpty({ message: 'Campo senha nao pode ser vazio' })
  @ApiProperty({ example: 'password', description: 'User password' })
  password: string;

  @IsNotEmpty({ message: 'Campo data aniversario nao pode ser vazio' })
  @ApiProperty({
    example: '2022-04-14T00:00:00.000Z',
    description: 'User birthday',
  })
  birthdate: Date;

  @IsEmail({}, { message: 'Formato email incorreto' })
  @ApiProperty({ example: 'Rua hum', description: 'User  address' })
  address: string;

  @ApiProperty({ example: 'Betim', description: 'User city' })
  city: string;

  @ApiProperty({ example: '32671199', description: 'User postal code' })
  postalcode: string;

  @ApiProperty({ example: 'brasil', description: 'User country' })
  country: string;

  @ApiProperty({ example: 'Minas Gerais', description: 'User state' })
  state: string;

  @IsNotEmpty({ message: 'Campo cpf nao pode ser vazio' })
  @ApiProperty({ example: '37271448071', description: 'User cpf' })
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
