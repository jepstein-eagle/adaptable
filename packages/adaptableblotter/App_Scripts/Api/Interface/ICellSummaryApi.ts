import { CellSummaryState } from '../../PredefinedConfig/RunTimeState/CellSummaryState';

export interface ICellSummaryApi {
  getCellSummaryState(): CellSummaryState;
  getCellSummaryOperation():
    | 'Sum'
    | 'Average'
    | 'Mode'
    | 'Median'
    | 'Distinct'
    | 'Max'
    | 'Min'
    | 'Count'
    | 'VWap'
    | 'Only';
}
