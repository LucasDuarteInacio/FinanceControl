import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OperationService } from './operation.service';
import { OperationRequestDTO } from './DTO/operationRequestDTO.model';
import { operation } from '@prisma/client';
import { OperationUpdateDTO } from './DTO/operationUpdateDTO.model';
import { Roles } from '../../decorators/roles.decorator';
import { RolesEnum } from '../auth/enum/roles.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Operations')
@Controller('operations')
export class OperationController {
  constructor(private operationService: OperationService) {}

  @Post()
  @Roles(RolesEnum.Default, RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Register new operation' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  newOperation(@Body() operation: OperationRequestDTO): Promise<operation> {
    return this.operationService.save(operation);
  }

  @Put()
  @Roles(RolesEnum.Default, RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'update operation' })
  @ApiResponse({ status: 404, description: 'operationId does not exist' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  updateOperation(@Body() operation: OperationUpdateDTO, @Query('operationId') operationId: string): Promise<operation> {
    return this.operationService.update(operation, operationId);
  }

  @Get('wallet/:walletId')
  @ApiBearerAuth()
  @Roles(RolesEnum.Default, RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'get operations by walletId' })
  @ApiResponse({ status: 404, description: 'walletId does not exist' })
  findAllByWalletId(@Param('walletId') walletId: string): Promise<operation[]> {
    return this.operationService.findAllByWalletId(walletId);
  }

  @Delete()
  @ApiBearerAuth()
  @HttpCode(204)
  @Roles(RolesEnum.Default, RolesEnum.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete operation' })
  @ApiResponse({ status: 404, description: 'operationId does not exist' })
  async deleteOperation(@Query('operationId') operationId: string): Promise<void> {
    await this.operationService.delete(operationId);
  }
}
