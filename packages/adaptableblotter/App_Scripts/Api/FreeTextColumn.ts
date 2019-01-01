import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IFreeTextColumn, IStyle } from "./Interface/IAdaptableBlotterObjects";
import * as FreeTextColumnRedux from '../Redux/ActionsReducers/FreeTextColumnRedux'
import { ApiBase } from "./ApiBase";

export interface IFreeTextColumnApi {
 
  

  // Free Text Column api methods
  freeTextColumnGetAll(): IFreeTextColumn[];
  freeTextColumnAdd(freeTextColumn: IFreeTextColumn): void;
  freeTextColumnCreate(columnId: string, defaultValue: string): void;
  freeTextColumnDelete(columnId: string): void;

}



export class FreeTextColumnApi extends ApiBase implements IFreeTextColumnApi {

     // Free Text Column api methods
  public freeTextColumnGetAll(): IFreeTextColumn[] {
    return this.getState().FreeTextColumn.FreeTextColumns;
  }

  public freeTextColumnAdd(freeTextColumn: IFreeTextColumn): void {
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnAdd(freeTextColumn))
  }

  public freeTextColumnCreate(columnId: string, defaultValue: string = null): void {
    let freeTextColumn: IFreeTextColumn = {
      ColumnId: columnId,
      DefaultValue: defaultValue,
      FreeTextStoredValues: []
    }
    this.freeTextColumnAdd(freeTextColumn);
  }

  public freeTextColumnDelete(columnId: string): void {
    let freeTextColumn: IFreeTextColumn = this.freeTextColumnGetAll().find(ftc => ftc.ColumnId == columnId);
    this.dispatchAction(FreeTextColumnRedux.FreeTextColumnDelete(freeTextColumn))
  }


}