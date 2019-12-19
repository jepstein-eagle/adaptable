import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { Glue42State } from '../../../PredefinedConfig/PartnerState';
export interface IGlue42Service {
  init(glue42State: Glue42State): void;

  // this is the non-live data way of doing export which works and is the default
  exportData(data: any[], gridColumns: AdaptableBlotterColumn[], primaryKeys: any[]): void;

  // these 2 methods are the proposed live way of doing export (doesnt currently work)
  // idea is that we first create the sheet... and then later to send the data
  // its not right and needs thinking but worth trying to get right as would be a big plus
  openSheet(data: any[]): Promise<any>;
  updateData(data: any[], gridColumns: AdaptableBlotterColumn[], primaryKeys: any[]): Promise<any>;
}
