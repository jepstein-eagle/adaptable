import { CellSummaryState } from '../../Redux/ActionsReducers/Interface/IState';

export interface ICellSummaryApi {
  getCellSummaryState(): CellSummaryState;
}
