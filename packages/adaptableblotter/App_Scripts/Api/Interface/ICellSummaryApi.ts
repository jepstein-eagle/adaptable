import { CellSummaryState } from '../../PredefinedConfig/IUserState/CellSummaryState';

export interface ICellSummaryApi {
  getCellSummaryState(): CellSummaryState;
}
