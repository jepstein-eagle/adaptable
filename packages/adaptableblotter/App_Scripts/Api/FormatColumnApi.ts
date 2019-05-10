import { IStyle } from '../Utilities/Interface/IStyle';
import { IFormatColumn } from '../Utilities/Interface/BlotterObjects/IFormatColumn';
import * as FormatColumnRedux from '../Redux/ActionsReducers/FormatColumnRedux';
import { ApiBase } from './ApiBase';
import { IFormatColumnApi } from './Interface/IFormatColumnApi';
import { FormatColumnState } from '../Redux/ActionsReducers/Interface/IState';

export class FormatColumnApi extends ApiBase implements IFormatColumnApi {
  public getFormatColumnState(): FormatColumnState {
    return this.getBlotterState().FormatColumn;
  }

  public getAllFormatColumn(): IFormatColumn[] {
    return this.getBlotterState().FormatColumn.FormatColumns;
  }

  public addFormatColumn(column: string, style: IStyle): void {
    let formatColumn: IFormatColumn = { ColumnId: column, Style: style };
    this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
  }

  public updateFormatColumn(column: string, style: IStyle): void {
    let formatColumn: IFormatColumn = { ColumnId: column, Style: style };
    this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn));
  }

  public deleteFormatColumn(formatColumn: IFormatColumn): void {
    this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn));
  }

  public deleteAllFormatColumn(): void {
    this.getAllFormatColumn().forEach(fc => {
      this.deleteFormatColumn(fc);
    });
  }
}
