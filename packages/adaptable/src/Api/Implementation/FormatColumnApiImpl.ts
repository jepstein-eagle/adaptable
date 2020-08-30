import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import { ApiBase } from './ApiBase';
import { FormatColumnApi } from '../FormatColumnApi';
import { FormatColumnState, FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import ObjectFactory from '../../Utilities/ObjectFactory';

export class FormatColumnApiImpl extends ApiBase implements FormatColumnApi {
  public getFormatColumnState(): FormatColumnState {
    return this.getAdaptableState().FormatColumn;
  }

  public getAllFormatColumn(): FormatColumn[] {
    return this.getAdaptableState().FormatColumn.FormatColumns;
  }

  public getAllFormatColumnWithStyle(): FormatColumn[] {
    return this.getAdaptableState().FormatColumn.FormatColumns.filter(fc => fc.Style != null);
  }

  public getAllFormatColumnWithDisplayFormat(): FormatColumn[] {
    return this.getAdaptableState().FormatColumn.FormatColumns.filter(
      fc => fc.DisplayFormat != null
    );
  }

  public getAllFormatColumnWithCellAlignment(): FormatColumn[] {
    return this.getAdaptableState().FormatColumn.FormatColumns.filter(
      fc => fc.CellAlignment != null
    );
  }

  public addFormatColumn(formatColumn: FormatColumn): void {
    this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
  }

  public editFormatColumn(formatColumn: FormatColumn): void {
    this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn));
  }

  public addFormatColumnStyle(formatColumn: FormatColumn, style: AdaptableStyle): void {
    formatColumn.Style = style;
    this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
  }

  public updateFormatColumnStyle(formatColumn: FormatColumn, style: AdaptableStyle): void {
    formatColumn.Style = style;
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

  public applyFormatColumnDisplayFormats(): void {
    this.adaptable.applyFormatColumnDisplayFormats();
  }

  // TODO: This is important as we need to get the FIRST one that matches
  public getFormatColumnForColumnId(columnId: string): FormatColumn | undefined {
    const formatColumns: FormatColumn[] = this.getAllFormatColumnWithDisplayFormat().concat(
      this.getAllFormatColumnWithCellAlignment()
    );
    return undefined;
  }

  public showFormatColumnPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.FormatColumnStrategyId,
      ScreenPopups.FormatColumnPopup
    );
  }
}
