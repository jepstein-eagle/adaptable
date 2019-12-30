import { IStyle } from '../../PredefinedConfig/Common/IStyle';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import { ApiBase } from './ApiBase';
import { FormatColumnApi } from '../FormatColumnApi';
import { FormatColumnState, FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class FormatColumnApiImpl extends ApiBase implements FormatColumnApi {
  public getFormatColumnState(): FormatColumnState {
    return this.getAdaptableState().FormatColumn;
  }

  public getAllFormatColumn(): FormatColumn[] {
    return this.getAdaptableState().FormatColumn.FormatColumns;
  }

  public addFormatColumn(column: string, style: IStyle): void {
    let formatColumn: FormatColumn = { ColumnId: column, Style: style };
    this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
  }

  public updateFormatColumn(column: string, style: IStyle): void {
    let formatColumn: FormatColumn = { ColumnId: column, Style: style };
    this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn));
  }

  public deleteFormatColumn(formatColumn: FormatColumn): void {
    this.dispatchAction(FormatColumnRedux.FormatColumnDelete(formatColumn));
  }

  public deleteAllFormatColumn(): void {
    this.getAllFormatColumn().forEach(fc => {
      this.deleteFormatColumn(fc);
    });
  }

  public showFormatColumnPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.FormatColumnStrategyId,
      ScreenPopups.FormatColumnPopup
    );
  }
}
