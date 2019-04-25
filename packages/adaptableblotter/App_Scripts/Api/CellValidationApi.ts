import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux'
import { ApiBase } from "./ApiBase";
import { ICellValidationRule } from "../Utilities/Interface/BlotterObjects/ICellValidationRule";
import { ICellValidationApi } from './Interface/ICellValidationApi';
import { CellValidationState } from '../Redux/ActionsReducers/Interface/IState';




export class CellValidationApi extends ApiBase implements ICellValidationApi {
 
  
  public GetState(): CellValidationState {
    return this.getBlotterState().CellValidation;
}


  public GetAll(): ICellValidationRule[] {
    return this.getBlotterState().CellValidation.CellValidations;
  }

  public Add(cellValidationRule: ICellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAddUpdate(-1, cellValidationRule))
  }

  public Delete(cellValidationRule: ICellValidationRule): void {
    let index: number = this.GetAll().findIndex(cv => cv == cellValidationRule)
    this.dispatchAction(CellValidationRedux.CellValidationDelete(index))
  }




}