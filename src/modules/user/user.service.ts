import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { WalletRequestDTO } from '../wallet/DTO/walletRequestDTO.model';
import { WalletService } from '../wallet/wallet.service';
import { UserRequestDTO } from './DTO/userRequestDTO.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private walletService: WalletService,
  ) {}

  async findById(id: string): Promise<user> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new HttpException(
        `Nao existe nenhum usuario cadastrado com o id: ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findAll(): Promise<user[]> {
    return this.userRepository.findAll();
  }

  async newUser(user: UserRequestDTO): Promise<user> {
    let userCreated;

    const cpf = await this.userRepository.findBy('cpf', user.cpf);
    const email = await this.userRepository.findBy('email', user.email);
    const cellphone = await this.userRepository.findBy(
      'cellphone',
      user.cellphone,
    );

    if (cpf || email || cellphone) {
      throw new HttpException(`Usuario ja existe`, HttpStatus.CONFLICT);
    }

    try {
      userCreated = await this.userRepository.save(user);
      const wallet = new WalletRequestDTO(0, 0, 0, userCreated.userid);
      await this.walletService.newWallet(wallet);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return userCreated;
  }
}
