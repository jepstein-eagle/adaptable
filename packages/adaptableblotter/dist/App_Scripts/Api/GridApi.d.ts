import { ApiBase } from "./ApiBase";
import { IGridApi } from "./Interface/IGridApi";
import { IColumn } from "../Utilities/Interface/IColumn";
import { GridState } from "../Redux/ActionsReducers/Interface/IState";
import { IGridSort } from "../Utilities/Interface/IGridSort";
export declare class GridApi extends ApiBase implements IGridApi {
    GetState(): GridState;
    setGridData(dataSource: any): void;
    getColumns(): IColumn[];
    getVisibleColumns(): IColumn[];
    getNumericColumns(): IColumn[];
    getGridSorts(): IGridSort[];
}
