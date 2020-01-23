import {
  CellSummaryState,
  CellSummaryOperationDefinition,
} from '../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../PredefinedConfig/Common/Enums';

export interface CellSummaryApi {
  getCellSummaryState(): CellSummaryState;
  getCellSummaryOperation(): CellSummaryOperation | string;

  getCellSummaryOperationDefinitions(): CellSummaryOperationDefinition[];
  addCellSummaryOperationDefinitions(
    cellSummaryOperationDefinitions: CellSummaryOperationDefinition[]
  ): void;

  /**
   * Opens the Cell Summary popup screen
   */
  showCellSummaryPopup(): void;
}
