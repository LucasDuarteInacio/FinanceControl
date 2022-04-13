import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { account } from '@prisma/client';
import { ValidCpf } from 'src/Decorators/validCpf.decorator';
import { AccountRequestDTO } from './DTO/accountRequestDTO.model';
import { AccountService } from './account.service';
import { AccountUpdateDTO } from './DTO/accountUpdateDTO.model';

@ApiTags('Accounts')
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
    description: 'There is already a account with the CPF, CellPhone or Email provided',
  })
  newAccount(@Body() @ValidCpf() account: AccountRequestDTO): Promise<account> {
    return this.accountService.newAccount(account);
  }

  @Put()
  @ApiOperation({ summary: 'Update account' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  updateAccount(@Body() account: AccountUpdateDTO, @Query('accountId') accountId: string): Promise<account> {
    return this.accountService.updateAccount(accountId, account);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete account' })
  @ApiResponse({ status: 404, description: 'accountId does not exist' })
  deleteAccount(@Query('accountId') accountId: string): Promise<account> {
    return this.accountService.deleteAccount(accountId);
  }
}
