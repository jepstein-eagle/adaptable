import {
  ColumnFilterState,
  ColumnFilter,
} from '../../PredefinedConfig/IUserState/ColumnFilterState';

export interface IColumnFilterApi {
  getColumnFilterState(): ColumnFilterState;
  setColumnFilter(columnFilters: ColumnFilter[]): void;
  clearColumnFilter(columnFilter: ColumnFilter): void;
  clearColumnFilterByColumn(column: string): void;
  clearColumnFilterByColumns(columns: string[]): void;
  clearAllColumnFilter(): void;
  getAllColumnFilter(): ColumnFilter[];
}
