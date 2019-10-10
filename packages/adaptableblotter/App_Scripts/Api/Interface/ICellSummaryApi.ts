import { CellSummaryState } from '../../PredefinedConfig/RunTimeState/CellSummaryState';
import {
  CellSummaryOperation,
  CellSummaryOptionalOperation,
} from '../../PredefinedConfig/Common/Enums';

export interface ICellSummaryApi {
  getCellSummaryState(): CellSummaryState;
  getCellSummaryOperation(): CellSummaryOperation | CellSummaryOptionalOperation;
  hasOnlySummary(): boolean;
  hasVWAPSummary(): boolean;

  /**
   * Opens the Cell Summary popup screen
   */
  showCellSummaryPopup(): void;
}
