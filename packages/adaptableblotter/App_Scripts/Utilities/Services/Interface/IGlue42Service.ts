import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { Glue42State } from '../../../PredefinedConfig/PartnerState';
export interface IGlue42Service {
  init(glue42State: Glue42State): void;
  exportData(data: any[], gridColumns: AdaptableBlotterColumn[], primaryKeys: any[]): void;

  // not sure about this but trying to first create the sheet... and then later to send the data
  openSheet(data: any[]): Promise<any>;
  updateData(data: any[], gridColumns: AdaptableBlotterColumn[], primaryKeys: any[]): Promise<any>;
}
