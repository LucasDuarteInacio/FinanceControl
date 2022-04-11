export class UserDTO {
  firstname: string;

  lastname: string;

  email: string;

  cellphone: string;

  password: string;

  birthdate: Date;

  address: string;

  city: string;

  postalcode: string;

  country: string;

  state: string;

  cpf: string;

  constructor(firstname, lastname, email, cellphone, password, birthdate, address, city, postalcode, country, state, cpf) {
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
