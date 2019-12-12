import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { Glue42State } from '../../../PredefinedConfig/PartnerState';
export interface IGlue42Service {
  init(glue42State: Glue42State): void;
  exportData(data: any[], gridColumns: AdaptableBlotterColumn[], primaryKeys: any[]): void;
}
