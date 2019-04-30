import { IColumnFilter } from "../../Utilities/Interface/BlotterObjects/IColumnFilter";
import { ColumnFilterState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IColumnFilterApi {
    getColumnFilterState(): ColumnFilterState;
    setColumnFilter(columnFilters: IColumnFilter[]): void;
    setColumnFilterFromUserFilter(userFilter: string): void;
    clearColumnFilter(columnFilter: IColumnFilter): void;
    clearColumnFilterByColumn(column: string): void;
    clearColumnFilterByColumns(columns: string[]): void;
    clearAllColumnFilter(): void;
    getAllColumnFilter(): IColumnFilter[];
}
