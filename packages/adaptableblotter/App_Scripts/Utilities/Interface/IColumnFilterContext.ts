import { AdaptableBlotterColumn } from './AdaptableBlotterColumn';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';

export interface IColumnFilterContext {
  Column: AdaptableBlotterColumn;
  Blotter: IAdaptableBlotter;
  ColumnWidth?: number;
  ShowCloseButton: boolean;
}
