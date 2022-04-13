import { Injectable } from '@nestjs/common';
import { OperationService } from '../operation/operation.service';
import { operation } from '@prisma/client';
import { AssetService } from '../asset/asset.service';

@Injectable()
export class DashboardService {
  constructor(private operationService: OperationService, private assetService: AssetService) {}

  async getGraphics(walletId): Promise<any> {
    const operations: Array<operation> = await this.operationService.findAllByWalletId(walletId);
    const filters = ['name', 'abbreviation', 'sector', 'subsector'];
    const graphics = [];

    for (const filter of filters) {
      const assetsFiltred = [];
      for (const operation of operations) {
        const asset = await this.assetService.findById(operation.assetid);
        const valueOperation = operation.value - operation.tax;
        const exitisAssets = assetsFiltred.findIndex((e) => e.asset === asset[filter]);

        if (assetsFiltred.length === 0 || exitisAssets === -1) {
          assetsFiltred.push({ asset: asset[filter], value: valueOperation });
        } else {
          assetsFiltred.forEach((af) => {
            if (af.asset === asset[filter]) {
              af.value = af.value + valueOperation;
            }
          });
        }
      }
      graphics.push(assetsFiltred);
    }
    return graphics;
  }
}
