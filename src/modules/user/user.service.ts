

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository:UserRepository) { }

    // async findByLogin(login: string): Promise<mnt_usuario>{
    //     const user = await this.usuarioRepository.findByLogin(login);

    //     if(!user){
    //         throw new HttpException(`Nao existe nenhum usuario cadastrado com o login: ${login}`, HttpStatus.NOT_FOUND);
    //     }
        
    //     return user;
    // }


    async findAll():Promise<user[]>{
        return this.userRepository.findAll();
    }
}
