import * as CalculatedColumnRedux from '../Redux/ActionsReducers/CalculatedColumnRedux'
import { ApiBase } from "./ApiBase";
import { ICalculatedColumn } from './Interface/IAdaptableBlotterObjects';

export interface ICalculatedColumnApi {

 
  // Calculated Column State
  calculatedColumnGetAll(): ICalculatedColumn[]
  calculatedColumnAdd(calculatedColumn: ICalculatedColumn): void
  calculatedColumnEditExpression(column: string, columnExpression: string): void
  calculatedColumnDelete(column: string): void

}


export class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {

  
  // Calculated Column State
  public calculatedColumnGetAll(): ICalculatedColumn[] {
    return this.getState().CalculatedColumn.CalculatedColumns;
  }

  public calculatedColumnAdd(calculatedColumn: ICalculatedColumn): void {
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn))
  }

  public calculatedColumnEditExpression(column: string, columnExpression: string): void {
    let calcColumn: ICalculatedColumn = this.calculatedColumnGetAll().find(cc => cc.ColumnId == column);
    let calcColumnIndex: number = this.calculatedColumnGetAll().findIndex(cc => cc.ColumnId == column);
    calcColumn.ColumnExpression = columnExpression;
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumnIndex, calcColumn))
  }

  public calculatedColumnDelete(column: string): void {
    let calcColumnIndex: number = this.calculatedColumnGetAll().findIndex(cc => cc.ColumnId == column);
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumnIndex))
  }


}