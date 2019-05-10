import { IAdaptableBlotter } from './IAdaptableBlotter';
import { IColumn } from './IColumn';
export interface IColumnFilterContext {
  Column: IColumn;
  Blotter: IAdaptableBlotter;
  ShowCloseButton: boolean;
}
