import { AdaptableStyle } from '../../PredefinedConfig/Common/AdaptableStyle';
import * as FormatColumnRedux from '../../Redux/ActionsReducers/FormatColumnRedux';
import { ApiBase } from './ApiBase';
import { FormatColumnApi } from '../FormatColumnApi';
import { FormatColumnState, FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import ObjectFactory from '../../Utilities/ObjectFactory';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';

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

  public getFormatColumnForColumn(column: AdaptableColumn): FormatColumn | undefined {
    const formatColumns: FormatColumn[] = this.getAllFormatColumn();
    return this.getAppropriateFormatColumn(formatColumns, column);
  }
  public getFormatColumnWithStyleForColumn(column: AdaptableColumn): FormatColumn | undefined {
    const formatColumns: FormatColumn[] = this.getAllFormatColumnWithStyle();
    return this.getAppropriateFormatColumn(formatColumns, column);
  }

  public getFormatColumnWithDisplayFormatForColumn(
    column: AdaptableColumn
  ): FormatColumn | undefined {
    const formatColumns: FormatColumn[] = this.getAllFormatColumnWithDisplayFormat().concat(
      this.getAllFormatColumnWithCellAlignment()
    );
    return this.getAppropriateFormatColumn(formatColumns, column);
  }

  private getAppropriateFormatColumn(
    formatColumns: FormatColumn[],
    column: AdaptableColumn
  ): FormatColumn | undefined {
    let test: FormatColumn[] | undefined = this.getFormatColumnsWithColumnScope(formatColumns)
      .concat(this.getFormatColumnsWithDataTypeScope(formatColumns))
      .concat(this.getFormatColumnsWithAllScope(formatColumns));

    let returnFormatColumn: FormatColumn = undefined;
    test.forEach((fc, index) => {
      // we just do one and then return
      if (returnFormatColumn == undefined) {
        if (this.adaptable.api.scopeApi.isColumnInScope(column, fc.Scope)) {
          returnFormatColumn = fc;
        }
      }
    });
    return returnFormatColumn;
  }

  public hasStyleFormatColumns(): boolean {
    return ArrayExtensions.IsNotNullOrEmpty(this.getAllFormatColumnWithStyle());
  }

  public showFormatColumnPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.FormatColumnStrategyId,
      ScreenPopups.FormatColumnPopup
    );
  }

  public getFormatColumnsWithAllScope(formatColumns: FormatColumn[]): FormatColumn[] | undefined {
    return formatColumns.filter(fc => this.adaptable.api.scopeApi.scopeIsAll(fc.Scope));
  }
  public getFormatColumnsWithDataTypeScope(
    formatColumns: FormatColumn[]
  ): FormatColumn[] | undefined {
    return formatColumns.filter(fc => this.adaptable.api.scopeApi.scopeHasDataType(fc.Scope));
  }
  public getFormatColumnsWithColumnScope(
    formatColumns: FormatColumn[]
  ): FormatColumn[] | undefined {
    return formatColumns.filter(fc => this.adaptable.api.scopeApi.scopeHasColumns(fc.Scope));
  }
}
