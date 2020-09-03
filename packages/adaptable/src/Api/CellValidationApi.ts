import { CellValidationState, CellValidationRule } from '../PredefinedConfig/CellValidationState';
import { PredicateDef } from '../PredefinedConfig/Common/Predicate';
import { Scope } from '../PredefinedConfig/Common/Scope';

export interface CellValidationApi {
  getCellValidationState(): CellValidationState;
  getAllCellValidation(): CellValidationRule[];
  addCellValidation(cellValidationRule: CellValidationRule): void;
  deleteCellValidation(cellValidationRule: CellValidationRule): void;

  /**
   * Opens the Cell Validation popup screen
   */
  showCellValidationPopup(): void;

  getPredicateDefs(): PredicateDef[];
  getPredicateDefsForScope(scope: Scope): PredicateDef[];
}
