import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AccountUpdateDTO {
  @IsNotEmpty({ message: 'Campo nome nao pode ser vazio' })
  @ApiProperty({ example: 'Lucas', description: 'First username' })
  firstname: string;

  @IsNotEmpty({ message: 'Campo sobrenome nao pode ser vazio' })
  @ApiProperty({ example: 'Duarte', description: 'Last username' })
  lastname: string;

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

  constructor(firstname, lastname, birthdate, address, city, postalcode, country, state) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.birthdate = birthdate;
    this.address = address;
    this.city = city;
    this.postalcode = postalcode;
    this.country = country;
    this.state = state;
  }
}
