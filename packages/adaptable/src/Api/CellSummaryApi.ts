import { CellSummaryState } from '../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../PredefinedConfig/Common/Enums';

export interface CellSummaryApi {
  getCellSummaryState(): CellSummaryState;
  getCellSummaryOperation(): CellSummaryOperation | string;

  /**
   * Opens the Cell Summary popup screen
   */
  showCellSummaryPopup(): void;
}
