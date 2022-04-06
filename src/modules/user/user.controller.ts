import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { UserDTO } from './DTO/userDTO.model';
//import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get(':id')
    @ApiOperation({ summary: 'Search user by id' })
    @ApiResponse({ status: 404, description: 'Did not find user with the informed is' })
    findById(@Param('id') id: string): Promise<user> {
        return this.userService.findById(id);
    }

    @Get()
    @ApiOperation({ summary: 'Search all database users' })
    findAll(): Promise<user[]> {
        return this.userService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({ status: 409, description: 'There is already a user with the CPF, CellPhone or Email provided' })
    newUser(@Body() user: UserDTO): Promise<user> {
        return this.userService.newUser(user);
    }
}
