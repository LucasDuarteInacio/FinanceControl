import { v4 as uuidv4 } from 'uuid';

export class AssetDTO {
  assetid: uuidv4;

  name: string;

  abbreviation: string;

  sector: string;

  subsector: string;

  constructor(assetid, name, abbreviation, sector, subsector) {
    this.assetid = assetid;
    this.name = name;
    this.abbreviation = abbreviation;
    this.sector = sector;
    this.subsector = subsector;
  }
}
