import { CellSummaryState } from './Interface/IState';
import { CellSummaryOperation, CellSummaryOptionalOperation } from '../../Utilities/Enums';
import * as Redux from 'redux';
export declare const CELL_SUMMARY_CHANGE_OPERATION = "CELL_SUMMARY_CHANGE_OPERATION";
export interface CellSummaryChangeOperationAction extends Redux.Action {
    SummaryOperation: CellSummaryOperation | CellSummaryOptionalOperation;
}
export declare const CellSummaryChangeOperation: (SummaryOperation: CellSummaryOperation | CellSummaryOptionalOperation) => CellSummaryChangeOperationAction;
export declare const CellSummaryReducer: Redux.Reducer<CellSummaryState>;
