import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux';
import { ApiBase } from './ApiBase';
import { ICellValidationApi } from './Interface/ICellValidationApi';
import {
  CellValidationState,
  CellValidationRule,
} from '../PredefinedConfig/IUserState/CellValidationState';

export class CellValidationApi extends ApiBase implements ICellValidationApi {
  public getCellValidationState(): CellValidationState {
    return this.getBlotterState().CellValidation;
  }

  public getAllCellValidation(): CellValidationRule[] {
    return this.getCellValidationState().CellValidations;
  }

  public addCellValidation(cellValidationRule: CellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAdd(cellValidationRule));
  }

  public deleteCellValidation(cellValidationRule: CellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationDelete(cellValidationRule));
  }
}
