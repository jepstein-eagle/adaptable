import { ApiBase } from "./ApiBase";
import { IGridApi } from "./Interface/IGridApi";
import { IColumn } from "../Utilities/Interface/IColumn";
import { GridState } from "../Redux/ActionsReducers/Interface/IState";
import { IGridSort } from "../Utilities/Interface/IGridSort";
import { ISelectedCellInfo } from "../Utilities/Interface/SelectedCell/ISelectedCellInfo";
export declare class GridApi extends ApiBase implements IGridApi {
    getGridState(): GridState;
    setGridData(dataSource: any): void;
    getColumns(): IColumn[];
    getSelectedCellInfo(): ISelectedCellInfo;
    getVisibleColumns(): IColumn[];
    getNumericColumns(): IColumn[];
    getGridSorts(): IGridSort[];
}
