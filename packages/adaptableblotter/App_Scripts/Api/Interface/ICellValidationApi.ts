import {
  CellValidationState,
  ICellValidationRule,
} from '../../PredefinedConfig/IUserState/CellValidationState';

export interface ICellValidationApi {
  getCellValidationState(): CellValidationState;
  getAllCellValidation(): ICellValidationRule[];
  addCellValidation(cellValidationRule: ICellValidationRule): void;
  deleteCellValidation(cellValidationRule: ICellValidationRule): void;
}
