import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {
    }

    // async findByLogin(loginUser: string): Promise<mnt_usuario>{
    //     return this.prisma.mnt_usuario.findFirst({
    //         where: {
    //             login: loginUser
    //         },
    //     })
    // }

    async findAll():Promise<user[]>{
        return this.prisma.user.findMany();
    }
}
