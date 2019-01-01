import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IFormatColumn, IStyle } from "./Interface/IAdaptableBlotterObjects";
import * as FormatColumnRedux from '../Redux/ActionsReducers/FormatColumnRedux'
import { ApiBase } from "./ApiBase";

export interface IFormatColumnApi {
  // FormatColumn State
  formatColumnGetAll(): IFormatColumn[]
  formatColumnnAdd(column: string, style: IStyle): void
  formatColumnnUpdate(column: string, style: IStyle): void
  formatColumnDelete(formatColumn: IFormatColumn): void
  formatColumnDeleteAll(): void
}



export class FormatColumnApi extends ApiBase implements IFormatColumnApi {

    // Format Column api methods
    public formatColumnGetAll(): IFormatColumn[] {
      return this.getState().FormatColumn.FormatColumns;
    }
  
    public formatColumnnAdd(column: string, style: IStyle): void {
      let formatColumn: IFormatColumn = { ColumnId: column, Style: style }
      this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn))
    }
  
    public formatColumnnUpdate(column: string, style: IStyle): void {
      let formatColumn: IFormatColumn = { ColumnId: column, Style: style }
      this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn))
    }
  
    public formatColumnDelete(formatColumn: IFormatColumn): void {
      this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn))
    }
  
    public formatColumnDeleteAll(): void {
      this.formatColumnGetAll().forEach(fc => {
        this.formatColumnDelete(fc);
      })
    }

}