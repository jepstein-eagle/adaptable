import { IUserState } from './IUserState';
export interface CellSummaryState extends IUserState {
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
