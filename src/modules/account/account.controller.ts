import { Body, Controller, Delete, Get, Param, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { account } from '@prisma/client';
import { AccountService } from './account.service';
import { AccountUpdateDTO } from './DTO/accountUpdateDTO.model';
import { Roles } from '../../decorators/roles.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { RolesEnum } from '../auth/enum/roles.enum';

@ApiTags('Accounts')
@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get(':id')
  @ApiBearerAuth()
  @Roles(RolesEnum.Default, RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Search account by id' })
  @ApiResponse({
    status: 404,
    description: 'Did not find account with the informed is',
  })
  findById(@Param('id') id: string): Promise<account> {
    return this.accountService.findById(id);
  }

  @Get()
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Search all database accounts' })
  findAll(): Promise<account[]> {
    return this.accountService.findAll();
  }

  @Put()
  @ApiBearerAuth()
  @Roles(RolesEnum.Default, RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update account' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  updateAccount(@Body() account: AccountUpdateDTO, @Query('accountId') accountId: string): Promise<account> {
    return this.accountService.updateAccount(accountId, account);
  }

  @Delete()
  @ApiBearerAuth()
  @Roles(RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete account' })
  @ApiResponse({ status: 404, description: 'accountId does not exist' })
  deleteAccount(@Query('accountId') accountId: string): Promise<account> {
    return this.accountService.deleteAccount(accountId);
  }
}
