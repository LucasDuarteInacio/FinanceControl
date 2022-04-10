import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { account } from '@prisma/client';
import { ValidCpf } from 'src/Decorators/validCpf.decorator';
import { AccountRequestDTO } from './DTO/accountRequestDTO.model';
import { AccountService } from './account.service';

@ApiTags('AccountS')
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Search account by id' })
  @ApiResponse({
    status: 404,
    description: 'Did not find account with the informed is',
  })
  findById(@Param('id') id: string): Promise<account> {
    return this.accountService.findById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Search all database accounts' })
  findAll(): Promise<account[]> {
    return this.accountService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Register new account' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({
    status: 409,
    description:
      'There is already a account with the CPF, CellPhone or Email provided',
  })
  newAccount(@Body() @ValidCpf() account: AccountRequestDTO): Promise<account> {
    return this.accountService.newAccount(account);
  }
}
