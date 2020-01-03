import * as FreeTextColumnRedux from '../../Redux/ActionsReducers/FreeTextColumnRedux';
import { ApiBase } from './ApiBase';
import { FreeTextColumnApi } from '../FreeTextColumnApi';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import {
  FreeTextColumnState,
  FreeTextColumn,
  FreeTextStoredValue,
} from '../../PredefinedConfig/FreeTextColumnState';

export class FreeTextColumnApiImpl extends ApiBase implements FreeTextColumnApi {
  public getFreeTextColumnState(): FreeTextColumnState {
    return this.getAdaptableState().FreeTextColumn;
  }

  public getAllFreeTextColumn(): FreeTextColumn[] {
    return this.getAdaptableState().FreeTextColumn.FreeTextColumns;
  }

  public addFreeTextColumn(freeTextColumn: FreeTextColumn): void {
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn));
  }

  public addEditFreeTextColumnStoredValue(
    freeTextColumn: FreeTextColumn,
    storedValue: FreeTextStoredValue
  ): void {
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
    let freeTextColumn: FreeTextColumn = this.getAllFreeTextColumn().find(
      ftc => ftc.ColumnId == columnId
    );
    if (
      this.checkItemExists(freeTextColumn, columnId, StrategyConstants.FreeTextColumnStrategyId)
    ) {
      this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn));
    }
  }

  public showFreeTextColumnPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.FreeTextColumnStrategyId,
      ScreenPopups.FreeTextColumnPopup
    );
  }
}
