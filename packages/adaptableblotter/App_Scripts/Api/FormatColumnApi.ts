import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { IStyle } from "../Utilities/Interface/IStyle";
import { IFormatColumn } from "../Utilities/Interface/BlotterObjects/IFormatColumn";
import * as FormatColumnRedux from '../Redux/ActionsReducers/FormatColumnRedux'
import { ApiBase } from "./ApiBase";
import { IFormatColumnApi } from './Interface/IFormatColumnApi';
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';

export class FormatColumnApi extends ApiBase implements IFormatColumnApi {

  
  public GetState(): FormatColumnState {
    return this.getBlotterState().FormatColumn;
}

public GetAll(): IFormatColumn[] {
    return this.getBlotterState().FormatColumn.FormatColumns;
  }

  public Add(column: string, style: IStyle): void {
    let formatColumn: IFormatColumn = { ColumnId: column, Style: style }
    this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn))
  }

  public Update(column: string, style: IStyle): void {
    let formatColumn: IFormatColumn = { ColumnId: column, Style: style }
    this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn))
  }

  public Delete(formatColumn: IFormatColumn): void {
    this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn))
  }

  public DeleteAll(): void {
    this.GetAll().forEach(fc => {
      this.Delete(fc);
    })
  }

}