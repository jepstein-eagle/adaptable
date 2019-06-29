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

/*
SummaryOperation

string

Which operation will be used by Cell Summary function at startup.  Possible values include:

Sum

Average

Mode

Median

Distinct

Max

Min

Count

OptionalSummaryOperations

string[]

Which of the non-standard Cell Summaries to use. Current options include:

Only

VWAP

*/
