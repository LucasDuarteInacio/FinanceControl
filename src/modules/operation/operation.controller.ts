import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OperationService } from './operation.service';
import { OperationRequestDTO } from './DTO/operationRequestDTO.model';
import { operation } from '@prisma/client';
import { OperationUpdateDTO } from './DTO/operationUpdateDTO.model';

@ApiTags('Operations')
@Controller('operations')
export class OperationController {
  constructor(private operationService: OperationService) {}

  @Post()
  @ApiOperation({ summary: 'Register new operation' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  newOperation(@Body() operation: OperationRequestDTO): Promise<operation> {
    return this.operationService.save(operation);
  }

  @Put()
  @ApiOperation({ summary: 'update operation' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  updateOperation(@Body() operation: OperationUpdateDTO, @Query('operationId') operationId: string): Promise<operation> {
    return this.operationService.update(operation, operationId);
  }

  @Get('wallet/:walletId')
  @ApiOperation({ summary: 'get operations by walletId' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  findAllByWalletId(@Param('walletId') walletId: string): Promise<operation[]> {
    return this.operationService.findAllByWalletId(walletId);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete operation' })
  @ApiResponse({ status: 404, description: 'operationId does not exist' })
  deleteAsset(@Query('operationId') operationId: string): Promise<operation> {
    return this.operationService.delete(operationId);
  }
}
