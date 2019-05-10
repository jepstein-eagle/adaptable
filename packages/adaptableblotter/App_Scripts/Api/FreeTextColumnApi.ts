import { IFreeTextColumn } from '../Utilities/Interface/BlotterObjects/IFreeTextColumn';
import * as FreeTextColumnRedux from '../Redux/ActionsReducers/FreeTextColumnRedux';
import { ApiBase } from './ApiBase';
import { IFreeTextColumnApi } from './Interface/IFreeTextColumnApi';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { FreeTextColumnState } from '../Redux/ActionsReducers/Interface/IState';

export class FreeTextColumnApi extends ApiBase implements IFreeTextColumnApi {
  public getFreeTextColumnState(): FreeTextColumnState {
    return this.getBlotterState().FreeTextColumn;
  }

  public getAllFreeTextColumn(): IFreeTextColumn[] {
    return this.getBlotterState().FreeTextColumn.FreeTextColumns;
  }

  public addFreeTextColumn(freeTextColumn: IFreeTextColumn): void {
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn));
  }

  public addEditFreeTextColumnStoredValue(freeTextColumn: IFreeTextColumn, storedValue: any): void {
    this.dispatchAction(
      FreeTextColumnRedux.FreeTextColumnAddEditStoredValue(freeTextColumn, storedValue)
    );
  }

  public createFreeTextColumn(columnId: string, defaultValue: string = null): void {
    let freeTextColumn = ObjectFactory.CreateEmptyFreeTextColumn();
    freeTextColumn.ColumnId = columnId;
    freeTextColumn.DefaultValue = defaultValue;
    this.addFreeTextColumn(freeTextColumn);
  }

  public deleteFreeTextColumn(columnId: string): void {
    let freeTextColumn: IFreeTextColumn = this.getAllFreeTextColumn().find(
      ftc => ftc.ColumnId == columnId
    );
    if (
      this.checkItemExists(freeTextColumn, columnId, StrategyConstants.FreeTextColumnStrategyId)
    ) {
      this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn));
    }
  }
}
