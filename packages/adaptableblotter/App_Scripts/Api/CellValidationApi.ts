import * as CellValidationRedux from '../Redux/ActionsReducers/CellValidationRedux'
import { ApiBase } from "./ApiBase";
import {  ICellValidationRule } from './Interface/IAdaptableBlotterObjects';

export interface ICellValidationApi {

   // CellValidation State
   cellValidationGetAll(): ICellValidationRule[]
   cellValidationAdd(cellValidationRule: ICellValidationRule): void
   cellValidationDelete(cellValidationRule: ICellValidationRule): void
 
  

}


export class CellValidationApi extends ApiBase implements ICellValidationApi {

  // CellValidation State
  public cellValidationGetAll(): ICellValidationRule[] {
    return this.getState().CellValidation.CellValidations;
  }

  public cellValidationAdd(cellValidationRule: ICellValidationRule): void {
    this.dispatchAction(CellValidationRedux.CellValidationAddUpdate(-1, cellValidationRule))
  }

  public cellValidationDelete(cellValidationRule: ICellValidationRule): void {
    let index: number = this.cellValidationGetAll().findIndex(cv => cv == cellValidationRule)
    this.dispatchAction(CellValidationRedux.CellValidationDelete(index))
  }




}