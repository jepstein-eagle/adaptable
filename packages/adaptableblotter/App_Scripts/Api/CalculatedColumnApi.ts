import * as CalculatedColumnRedux from '../Redux/ActionsReducers/CalculatedColumnRedux';
import { ApiBase } from './ApiBase';
import { ICalculatedColumnApi } from './Interface/ICalculatedColumnApi';
import {
  CalculatedColumnState,
  CalculatedColumn,
} from '../PredefinedConfig/RunTimeState/CalculatedColumnState';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';

export class CalculatedColumnApi extends ApiBase implements ICalculatedColumnApi {
  public getCalculatedColumnState(): CalculatedColumnState {
    return this.getBlotterState().CalculatedColumn;
  }

  public getAllCalculatedColumn(): CalculatedColumn[] {
    return this.getCalculatedColumnState().CalculatedColumns;
  }

  public addCalculatedColumn(calculatedColumn: CalculatedColumn): void {
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn));
  }

  public editCalculatedColumnExpression(column: string, columnExpression: string): void {
    let calcColumn: CalculatedColumn = this.getAllCalculatedColumn().find(
      cc => cc.ColumnId == column
    );
    calcColumn.ColumnExpression = columnExpression;
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumn));
  }

  public deleteCalculatedColumn(column: string): void {
    let calcColumn: CalculatedColumn = this.getAllCalculatedColumn().find(
      cc => cc.ColumnId == column
    );
    this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumn));
  }

  public showCalculatedColumnPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.CalculatedColumnStrategyId,
      ScreenPopups.CalculatedColumnPopup
    );
  }
}
