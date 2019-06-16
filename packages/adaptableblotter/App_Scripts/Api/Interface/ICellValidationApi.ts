import {
  CellValidationState,
  ICellValidationRule,
} from '../../PredefinedConfig/IUserState Interfaces/CellValidationState';

export interface ICellValidationApi {
  getCellValidationState(): CellValidationState;
  getAllCellValidation(): ICellValidationRule[];
  addCellValidation(cellValidationRule: ICellValidationRule): void;
  deleteCellValidation(cellValidationRule: ICellValidationRule): void;
}
