import { ApiBase } from "./ApiBase";
import { IColumnFilter } from "../Utilities/Interface/BlotterObjects/IColumnFilter";
import { IColumnFilterApi } from './Interface/IColumnFilterApi';
import { ColumnFilterState } from '../Redux/ActionsReducers/Interface/IState';
export declare class ColumnFilterApi extends ApiBase implements IColumnFilterApi {
    getColumnFilterState(): ColumnFilterState;
    setColumnFilter(columnFilters: IColumnFilter[]): void;
    setColumnFilterFromUserFilter(userFilter: string): void;
    clearColumnFilter(columnFilter: IColumnFilter): void;
    clearColumnFilterByColumns(columns: string[]): void;
    clearColumnFilterByColumn(column: string): void;
    clearAllColumnFilter(): void;
    getAllColumnFilter(): IColumnFilter[];
}
