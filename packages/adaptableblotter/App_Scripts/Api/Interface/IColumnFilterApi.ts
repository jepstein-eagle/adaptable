import {
  ColumnFilterState,
  IColumnFilter,
} from '../../PredefinedConfig/IUserState Interfaces/ColumnFilterState';

export interface IColumnFilterApi {
  getColumnFilterState(): ColumnFilterState;
  setColumnFilter(columnFilters: IColumnFilter[]): void;
  clearColumnFilter(columnFilter: IColumnFilter): void;
  clearColumnFilterByColumn(column: string): void;
  clearColumnFilterByColumns(columns: string[]): void;
  clearAllColumnFilter(): void;
  getAllColumnFilter(): IColumnFilter[];
}
