import { CellSummaryState } from '../PredefinedConfig/CellSummaryState';
import {
  CellSummaryOperation,
  CellSummaryOptionalOperation,
} from '../PredefinedConfig/Common/Enums';

export interface CellSummaryApi {
  getCellSummaryState(): CellSummaryState;
  getCellSummaryOperation(): CellSummaryOperation | CellSummaryOptionalOperation;
  hasOnlySummary(): boolean;
  hasVWAPSummary(): boolean;

  /**
   * Opens the Cell Summary popup screen
   */
  showCellSummaryPopup(): void;
}
