import { CellValidationState, CellValidationRule } from '../PredefinedConfig/CellValidationState';
import { AdaptablePredicateDef } from '../PredefinedConfig/Common/AdaptablePredicate';
import { AdaptableScope } from '../PredefinedConfig/Common/AdaptableScope';

export interface CellValidationApi {
  getCellValidationState(): CellValidationState;
  getAllCellValidation(): CellValidationRule[];
  addCellValidation(cellValidationRule: CellValidationRule): void;
  deleteCellValidation(cellValidationRule: CellValidationRule): void;

  /**
   * Opens the Cell Validation popup screen
   */
  showCellValidationPopup(): void;

  getPredicateDefs(): AdaptablePredicateDef[];
  getPredicateDefsForScope(scope: AdaptableScope): AdaptablePredicateDef[];
}
