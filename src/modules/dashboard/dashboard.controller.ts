import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboards')
@Controller('dashboards')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get(':walletId')
  @ApiOperation({ summary: 'get Graphics' })
  findAll(@Param('walletId') walletId: string): Promise<any> {
    return this.dashboardService.getGraphics(walletId);
  }
}
