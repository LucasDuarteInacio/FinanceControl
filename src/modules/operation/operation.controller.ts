import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OperationService } from './operation.service';
import { OperationRequestDTO } from './DTO/operationRequestDTO.model';
import { OperationDTO } from './DTO/operationDTO.model';
import { operation } from "@prisma/client";

@ApiTags('Operations')
@Controller('operations')
export class OperationController {
  constructor(private operationService: OperationService) {}

  @Post()
  @ApiOperation({ summary: 'Register new operation' })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  newOperation(@Body() operation: OperationRequestDTO): Promise<operation> {
    return this.operationService.newOperation(operation);
  }
}
