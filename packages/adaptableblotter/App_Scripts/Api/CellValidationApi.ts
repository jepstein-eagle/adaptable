import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux';
import { ApiBase } from './ApiBase';
import { ICellValidationApi } from './Interface/ICellValidationApi';
import {
  CellValidationState,
  ICellValidationRule,
} from '../PredefinedConfig/IUserState Interfaces/CellValidationState';

export class CellValidationApi extends ApiBase implements ICellValidationApi {
  public getCellValidationState(): CellValidationState {
    return this.getBlotterState().CellValidation;
  }

  public getAllCellValidation(): ICellValidationRule[] {
    return this.getCellValidationState().CellValidations;
  }

  public addCellValidation(cellValidationRule: ICellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAdd(cellValidationRule));
  }

  public deleteCellValidation(cellValidationRule: ICellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationDelete(cellValidationRule));
  }
}
