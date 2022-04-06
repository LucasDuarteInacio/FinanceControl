import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {
    }

    async findById(userid: string): Promise<user> {
        return this.prisma.user.findUnique({
            where: {
                userid
            },
        })
    }

    async findByCpf(cpf: string): Promise<user> {
        return this.prisma.user.findUnique({
            where: {
                cpf
            },
        })
    }

    async findBy(key: string, value: string): Promise<user> {

        switch (key) {
            case 'cpf':
                return this.prisma.user.findFirst({
                    where: {
                        cpf: value
                    },
                })
            case 'email':
                return this.prisma.user.findFirst({
                    where: {
                        email: value
                    },
                })
            case 'cellphone':
                return this.prisma.user.findFirst({
                    where: {
                        cellphone: value
                    },
                })

            default:
                throw new HttpException(`Campo nao existe`, HttpStatus.NOT_FOUND);

        }
    }

    async findAll(): Promise<user[]> {
        return this.prisma.user.findMany();
    }


    async save(data: any): Promise<user> {
        data.userid = uuidv4();
        return this.prisma.user.create({
            data: data
        });
    }

}
