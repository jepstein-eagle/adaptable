import * as CalculatedColumnRedux from '../Redux/ActionsReducers/CalculatedColumnRedux'
import { ApiBase } from "./ApiBase";
import { ICalculatedColumn } from './Interface/IAdaptableBlotterObjects';

export interface ICalculatedColumnApi {

 
  GetAll(): ICalculatedColumn[]
  Add(calculatedColumn: ICalculatedColumn): void
  EditExpression(column: string, columnExpression: string): void
  Delete(column: string): void

}


export class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {

 
  public GetAll(): ICalculatedColumn[] {
    return this.getState().CalculatedColumn.CalculatedColumns;
  }

  public Add(calculatedColumn: ICalculatedColumn): void {
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn))
  }

  public EditExpression(column: string, columnExpression: string): void {
    let calcColumn: ICalculatedColumn = this.GetAll().find(cc => cc.ColumnId == column);
    let calcColumnIndex: number = this.GetAll().findIndex(cc => cc.ColumnId == column);
    calcColumn.ColumnExpression = columnExpression;
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumnIndex, calcColumn))
  }

  public Delete(column: string): void {
    let calcColumnIndex: number = this.GetAll().findIndex(cc => cc.ColumnId == column);
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumnIndex))
  }


}