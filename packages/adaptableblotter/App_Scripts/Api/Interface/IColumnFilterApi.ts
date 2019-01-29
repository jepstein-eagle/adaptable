import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux'
import { ApiBase } from "../ApiBase";
import { IUserFilter } from "../../Utilities/Interface/BlotterObjects/IUserFilter";
import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
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
