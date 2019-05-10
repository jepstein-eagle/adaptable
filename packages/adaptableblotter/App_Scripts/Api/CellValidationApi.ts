import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux';
import { ApiBase } from './ApiBase';
import { ICellValidationRule } from '../Utilities/Interface/BlotterObjects/ICellValidationRule';
import { ICellValidationApi } from './Interface/ICellValidationApi';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';

export class CellValidationApi extends ApiBase implements ICellValidationApi {
  public getCellValidationState(): CellValidationState {
    return this.getBlotterState().CellValidation;
  }

  public getAllCellValidation(): ICellValidationRule[] {
    return this.getCellValidationState().CellValidations;
  }

  public addCellValidation(cellValidationRule: ICellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAddUpdate(-1, cellValidationRule));
  }

  public deleteCellValidation(cellValidationRule: ICellValidationRule): void {
    let index: number = this.getAllCellValidation().findIndex(cv => cv == cellValidationRule);
    this.dispatchAction(CellValidationRedux.CellValidationDelete(index));
  }
}
