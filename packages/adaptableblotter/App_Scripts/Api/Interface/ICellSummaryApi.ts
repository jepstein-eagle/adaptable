import { CellSummaryState } from '../../PredefinedConfig/IUserState Interfaces/CellSummaryState';

export interface ICellSummaryApi {
  getCellSummaryState(): CellSummaryState;
}
