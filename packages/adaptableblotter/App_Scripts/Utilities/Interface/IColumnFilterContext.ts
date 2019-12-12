import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';

export interface IColumnFilterContext {
  Column: AdaptableBlotterColumn;
  Blotter: IAdaptableBlotter;
  ColumnWidth?: number;
  ShowCloseButton: boolean;
}
