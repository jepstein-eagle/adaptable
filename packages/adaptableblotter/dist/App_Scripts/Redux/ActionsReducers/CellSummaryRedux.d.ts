import { CellSummaryState } from './Interface/IState';
import { CellSumaryOperation, CellSumaryOptionalOperation } from '../../Utilities/Enums';
import * as Redux from 'redux';
export declare const CELL_SUMMARY_CHANGE_OPERATION = "CELL_SUMMARY_CHANGE_OPERATION";
export interface CellSummaryChangeOperationAction extends Redux.Action {
    SummaryOperation: CellSumaryOperation | CellSumaryOptionalOperation;
}
export declare const CellSummaryChangeOperation: (SummaryOperation: CellSumaryOperation | CellSumaryOptionalOperation) => CellSummaryChangeOperationAction;
export declare const CellSummaryReducer: Redux.Reducer<CellSummaryState>;
