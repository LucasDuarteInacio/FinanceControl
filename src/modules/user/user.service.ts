

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { UserDTO } from './DTO/userDTO.model';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(private userRepository: UserRepository) { }


    async findById(id: string): Promise<user> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new HttpException(`Nao existe nenhum usuario cadastrado com o id: ${id}`, HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async findAll(): Promise<user[]> {
        return this.userRepository.findAll();
    }

    async newUser(user: UserDTO): Promise<user> {
        const cpf = await this.userRepository.findBy('cpf',user.cpf);
        const email = await this.userRepository.findBy('email',user.email);
        const cellphone = await this.userRepository.findBy('cellphone',user.cellphone);
        if (cpf || email || cellphone) {
            throw new HttpException(`Usuario ja existe`, HttpStatus.CONFLICT);
        }
        return this.userRepository.save(user);

    }
}
