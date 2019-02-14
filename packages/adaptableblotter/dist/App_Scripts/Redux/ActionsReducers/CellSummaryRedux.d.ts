import { CellSummaryState } from './Interface/IState';
import { CellSumaryOperation } from '../../Utilities/Enums';
import * as Redux from 'redux';
export declare const CELL_SUMMARY_CHANGE_OPERATION = "CELL_SUMMARY_CHANGE_OPERATION";
export interface CellSummaryChangeOperationAction extends Redux.Action {
    CellSumaryOperation: CellSumaryOperation;
}
export declare const CellSummaryChangeOperation: (CellSumaryOperation: CellSumaryOperation) => CellSummaryChangeOperationAction;
export declare const CellSummaryReducer: Redux.Reducer<CellSummaryState>;
