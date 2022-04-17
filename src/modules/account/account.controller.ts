import { Body, Controller, Delete, Get, Header, HttpCode, Param, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { account } from '@prisma/client';
import { AccountService } from './account.service';
import { AccountUpdateDTO } from './DTO/accountUpdateDTO.model';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { RolesEnum } from '../auth/enum/roles.enum';
import { AccountDTO } from './DTO/accountDTO.model';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':accountId')
  @ApiBearerAuth()
  @Roles(RolesEnum.Default)
  @Header('x-userid', 'none')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Search account by id' })
  @ApiResponse({
    status: 404,
    description: 'Did not find account with the informed is!',
  })
  @ApiHeader({
    name: 'x-userid',
    description: 'validate userId',
  })
  @Header('x-userid', 'none')
  findById(@Param('accountId') accountId: string): Promise<AccountDTO> {
    return this.accountService.findById(accountId);
  }

  @Get()
  @ApiBearerAuth()
  @Roles()
  @ApiHeader({
    name: 'x-userid',
    description: 'validate userId',
  })
  @Header('x-userid', 'none')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Search all database accounts' })
  findAll(): Promise<AccountDTO[]> {
    return this.accountService.findAll();
  }

  @Put()
  @ApiBearerAuth()
  @Roles(RolesEnum.Default)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiHeader({
    name: 'x-userid',
    description: 'validate userId',
  })
  @Header('x-userid', 'none')
  @ApiOperation({ summary: 'Update account' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  updateAccount(@Body() account: AccountUpdateDTO, @Query('accountId') accountId: string): Promise<account> {
    return this.accountService.updateAccount(accountId, account);
  }

  @Delete()
  @HttpCode(204)
  @ApiBearerAuth()
  @Roles()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiHeader({
    name: 'x-userid',
    description: 'validate userId',
  })
  @Header('x-userid', 'none')
  @ApiOperation({ summary: 'Delete account' })
  @ApiResponse({ status: 404, description: 'accountId does not exist' })
  async deleteAccount(@Query('accountId') accountId: string): Promise<void> {
    await this.accountService.deleteAccount(accountId);
  }
}
