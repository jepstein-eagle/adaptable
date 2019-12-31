import { RunTimeState } from './RunTimeState';
import { CellSummaryOperation } from './Common/Enums';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';

export interface CellSummaryOperationDefinition {
  name: string;
  fn: (operationParam: {
    selectedCellInfo: SelectedCellInfo;
    allValues: any[];
    numericColumns: string[];
    numericValues: number[];
    distinctCount: number;
  }) => any;
}

export interface CellSummaryState extends RunTimeState {
  SummaryOperation?: CellSummaryOperation | string;
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
