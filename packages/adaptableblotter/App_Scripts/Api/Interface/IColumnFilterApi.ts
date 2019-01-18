import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import { ApiBase } from "../ApiBase";
import { IUserFilter, IColumnFilter } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { ObjectFactory } from '../../Utilities/ObjectFactory';

export interface IColumnFilterApi {

  Set(columnFilters: IColumnFilter[]): void
  SetFromUserFilter(userFilter: string): void
  Clear(columnFilter: IColumnFilter): void
  ClearByColumn(column: string): void
  ClearByColumns(columns: string[]): void
  ClearAll(): void
  GetCurrent(): IColumnFilter[]
  
}
