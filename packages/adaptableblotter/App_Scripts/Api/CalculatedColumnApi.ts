import * as CalculatedColumnRedux from '../Redux/ActionsReducers/CalculatedColumnRedux'
import { ApiBase } from "./ApiBase";
import { ICalculatedColumn } from "../Utilities/Interface/BlotterObjects/ICalculatedColumn";
import { ICalculatedColumnApi } from './Interface/ICalculatedColumnApi';
import { CalculatedColumnState } from '../Redux/ActionsReducers/Interface/IState';



export class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {

 
  public GetState(): CalculatedColumnState {
    return this.getBlotterState().CalculatedColumn;
}

  public GetAll(): ICalculatedColumn[] {
    return this.getBlotterState().CalculatedColumn.CalculatedColumns;
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