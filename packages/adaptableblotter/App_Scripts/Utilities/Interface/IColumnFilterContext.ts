import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';

export interface IColumnFilterContext {
  Column: AdaptableColumn;
  Blotter: IAdaptableBlotter;
  ColumnWidth?: number;
  ShowCloseButton: boolean;
}
