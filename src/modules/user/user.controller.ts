import { Controller, Get, Param } from '@nestjs/common';
import { user } from '@prisma/client';
//import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

//@ApiTags('Usuarios')
@Controller('users')
export class UserController {
    constructor(private userService:UserService) {}

    // @Get(':login')
    // @ApiOperation({ summary: 'Busca uma usuário por login' })
    // @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
    // findById(@Param('login') login: string): Promise<mnt_usuario> {
    //     return this.usuarioService.findByLogin(login);
    // }

    @Get()
    findAll():Promise<user[]>{
        return this.userService.findAll();
    }
}
