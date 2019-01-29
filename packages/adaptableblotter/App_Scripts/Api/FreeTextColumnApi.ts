import { IFreeTextColumn } from "../Utilities/Interface/BlotterObjects/IFreeTextColumn";
import * as FreeTextColumnRedux from '../Redux/ActionsReducers/FreeTextColumnRedux'
import { ApiBase } from "./ApiBase";
import { IFreeTextColumnApi } from "./Interface/IFreeTextColumnApi";
import { ObjectFactory } from "../Utilities/ObjectFactory";
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'


export class FreeTextColumnApi extends ApiBase implements IFreeTextColumnApi {

  public GetAll(): IFreeTextColumn[] {
    return this.getState().FreeTextColumn.FreeTextColumns;
  }

  public Add(freeTextColumn: IFreeTextColumn): void {
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn))
  }

  public Create(columnId: string, defaultValue: string = null): void {
    let freeTextColumn = ObjectFactory.CreateEmptyFreeTextColumn();
    freeTextColumn.ColumnId = columnId;
    freeTextColumn.DefaultValue = defaultValue;
    this.Add(freeTextColumn);
  }

  public Delete(columnId: string): void {
    let freeTextColumn: IFreeTextColumn = this.GetAll().find(ftc => ftc.ColumnId == columnId);
    if (this.checkItemExists(freeTextColumn, columnId, StrategyConstants.FreeTextColumnStrategyId)) {
      this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn))
    }
  }

}