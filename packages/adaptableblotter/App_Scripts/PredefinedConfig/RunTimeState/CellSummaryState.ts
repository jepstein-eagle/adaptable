import { RunTimeState } from './RunTimeState';
export interface CellSummaryState extends RunTimeState {
  SummaryOperation?:
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
  OptionalSummaryOperations?: string[]; // for now just 'VWaP' and 'Only' are available
}
