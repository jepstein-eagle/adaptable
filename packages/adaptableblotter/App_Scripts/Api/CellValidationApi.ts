import { CellValidationState, CellValidationRule } from '../PredefinedConfig/CellValidationState';

export interface CellValidationApi {
  getCellValidationState(): CellValidationState;
  getAllCellValidation(): CellValidationRule[];
  addCellValidation(cellValidationRule: CellValidationRule): void;
  deleteCellValidation(cellValidationRule: CellValidationRule): void;

  /**
   * Opens the Cell Validation popup screen
   */
  showCellValidationPopup(): void;
}
