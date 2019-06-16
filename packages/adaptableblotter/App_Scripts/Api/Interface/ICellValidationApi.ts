import {
  CellValidationState,
  CellValidationRule,
} from '../../PredefinedConfig/RunTimeState/CellValidationState';

export interface ICellValidationApi {
  getCellValidationState(): CellValidationState;
  getAllCellValidation(): CellValidationRule[];
  addCellValidation(cellValidationRule: CellValidationRule): void;
  deleteCellValidation(cellValidationRule: CellValidationRule): void;
}
