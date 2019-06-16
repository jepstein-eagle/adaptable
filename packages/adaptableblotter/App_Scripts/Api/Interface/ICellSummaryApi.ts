import { CellSummaryState } from '../../PredefinedConfig/RunTimeState/CellSummaryState';

export interface ICellSummaryApi {
  getCellSummaryState(): CellSummaryState;
}
