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

  public addFormatColumnStyle(column: string, style: AdaptableStyle): void {
    let formatColumn: FormatColumn = { ColumnId: column, Style: style };
    this.dispatchAction(FormatColumnRedux.FormatColumnAdd(formatColumn));
  }

  public updateFormatColumnStyle(column: string, style: AdaptableStyle): void {
    let formatColumn: FormatColumn = { ColumnId: column, Style: style };
    this.dispatchAction(FormatColumnRedux.FormatColumnEdit(formatColumn));
  }

  public setFormatColumnStylet(columnId: string, style: AdaptableStyle): void {
    let formatColumn: FormatColumn = this.getAllFormatColumn().find(fc => fc.ColumnId == columnId);
    if (formatColumn) {
      this.addFormatColumnStyle(columnId, style);
    } else {
      this.updateFormatColumnStyle(columnId, style);
    }
  }

  public setCellAlignment(columnId: string, cellAlignment: 'Left' | 'Right' | 'Center'): void {
    let formatColumn: FormatColumn = this.getAllFormatColumn().find(fc => fc.ColumnId == columnId);
    if (formatColumn) {
      formatColumn.CellAlignment = cellAlignment;
      this.editFormatColumn(formatColumn);
    } else {
      formatColumn = { ColumnId: columnId, CellAlignment: cellAlignment };
      this.addFormatColumn(formatColumn);
    }
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

  public showFormatColumnPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.FormatColumnStrategyId,
      ScreenPopups.FormatColumnPopup
    );
  }
}
