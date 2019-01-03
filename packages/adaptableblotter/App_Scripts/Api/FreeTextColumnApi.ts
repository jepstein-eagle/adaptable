import { IFreeTextColumn } from "./Interface/IAdaptableBlotterObjects";
import * as FreeTextColumnRedux from '../Redux/ActionsReducers/FreeTextColumnRedux'
import { ApiBase } from "./ApiBase";
import { IFreeTextColumnApi } from "./Interface/IFreeTextColumnApi";

export class FreeTextColumnApi extends ApiBase implements IFreeTextColumnApi {

     // Free Text Column api methods
  public  GetAll(): IFreeTextColumn[] {
    return this.getState().FreeTextColumn.FreeTextColumns;
  }

  public  Add(freeTextColumn: IFreeTextColumn): void {
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn))
  }

  public  Create(columnId: string, defaultValue: string = null): void {
    let freeTextColumn: IFreeTextColumn = {
      ColumnId: columnId,
      DefaultValue: defaultValue,
      FreeTextStoredValues: []
    }
    this.Add(freeTextColumn);
  }

  public  Delete(columnId: string): void {
    let freeTextColumn: IFreeTextColumn = this.GetAll().find(ftc => ftc.ColumnId == columnId);
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn))
  }


}