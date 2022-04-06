import { ApiProperty } from "@nestjs/swagger";

export class UserDTO { 

    @ApiProperty({ example: 'Lucas', description: 'First username' })
	firstname: string;

    @ApiProperty({ example: 'Duarte', description: 'Last username' })
	lastname: string;

    @ApiProperty({ example: 'lucasduarte@email.com', description: 'User email' })
	email: string;

    @ApiProperty({ example: '+5531999999999', description: 'User cell phone' })
	cellphone: string;

    @ApiProperty({ example: 'password', description: 'User password' })
	password: string;

    @ApiProperty({ example: '2022-04-14T00:00:00.000Z', description: 'User birthday' })
	birthdate: Date;

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

    @ApiProperty({ example: '372.714.480-71', description: 'User cpf' })
	cpf: string;

  



    constructor(firstname, lastname, email, cellphone, password, birthdate, address,city,postalcode,country,state,cpf) {
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
