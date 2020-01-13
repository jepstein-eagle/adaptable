import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';

export interface IColumnFilterContext {
  Column: AdaptableColumn;
  Adaptable: IAdaptable;
  ColumnWidth?: number;
  ShowCloseButton: boolean;
}
