import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
import { ColumnFilterState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IColumnFilterApi {
  GetState(): ColumnFilterState;
  Set(columnFilters: IColumnFilter[]): void
  SetFromUserFilter(userFilter: string): void
  Clear(columnFilter: IColumnFilter): void
  ClearByColumn(column: string): void
  ClearByColumns(columns: string[]): void
  ClearAll(): void
  GetAll(): IColumnFilter[]
  
}
