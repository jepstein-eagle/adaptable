import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../BlotterInterfaces/IAdaptable';

export interface IColumnFilterContext {
  Column: AdaptableColumn;
  Blotter: IAdaptable;
  ColumnWidth?: number;
  ShowCloseButton: boolean;
}
