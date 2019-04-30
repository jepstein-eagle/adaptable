import { ApiBase } from "./ApiBase";
import { ICellSummaryApi } from './Interface/ICellSummaryApi';
import { CellSummaryState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CellSummaryApi extends ApiBase implements ICellSummaryApi {
    getCellSummaryState(): CellSummaryState;
}
