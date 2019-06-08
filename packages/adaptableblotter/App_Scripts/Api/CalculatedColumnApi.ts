import * as CalculatedColumnRedux from '../Redux/ActionsReducers/CalculatedColumnRedux';
import { ApiBase } from './ApiBase';
import { ICalculatedColumn } from '../Utilities/Interface/BlotterObjects/ICalculatedColumn';
import { ICalculatedColumnApi } from './Interface/ICalculatedColumnApi';
import { CalculatedColumnState } from '../Redux/ActionsReducers/Interface/IState';

export class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {
  public getCalculatedColumnState(): CalculatedColumnState {
    return this.getBlotterState().CalculatedColumn;
  }

  public getAllCalculatedColumn(): ICalculatedColumn[] {
    return this.getCalculatedColumnState().CalculatedColumns;
  }

  public addCalculatedColumn(calculatedColumn: ICalculatedColumn): void {
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn));
  }

  public editCalculatedColumnExpression(column: string, columnExpression: string): void {
    let calcColumn: ICalculatedColumn = this.getAllCalculatedColumn().find(
      cc => cc.ColumnId == column
    );
    calcColumn.ColumnExpression = columnExpression;
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumn));
  }

  public deleteCalculatedColumn(column: string): void {
    let calcColumn: ICalculatedColumn = this.getAllCalculatedColumn().find(
      cc => cc.ColumnId == column
    );
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumn));
  }
}
