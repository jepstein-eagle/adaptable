import { ApiBase } from './ApiBase';
import { GridApi } from '../GridApi';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { GridState } from '../../PredefinedConfig/GridState';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { DataChangedInfo } from '../../AdaptableOptions/CommonObjects/DataChangedInfo';
import { AdaptableOptions } from '../../types';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';

export class GridApiImpl extends ApiBase implements GridApi {
  public getGridState(): GridState {
    return this.getAdaptableState().Grid;
  }

  public setGridData(dataSource: any): void {
    this.adaptable.setDataSource(dataSource);
  }

  public updateGridData(
    dataRows: any[],
    config?: { batchUpdate?: boolean; callback?: (res: any) => void }
  ): void {
    this.adaptable.updateRows(dataRows, config);
  }

  public addGridData(dataRows: any[]): void {
    this.adaptable.addRows(dataRows);
  }

  public deleteGridData(dataRows: any[]): void {
    if (this.checkArrayExists(dataRows)) {
      this.adaptable.deleteRows(dataRows);
    }
  }

  public setCellValue(columnId: string, newValue: any, primaryKeyValue: any): void {
    let gridCell: GridCell = {
      primaryKeyValue: primaryKeyValue,
      columnId: columnId,
      rawValue: newValue,
      displayValue: newValue,
    };
    this.adaptable.api.internalApi.setGridCell(gridCell, false, false);
  }

  public getColumns(): AdaptableColumn[] {
    return this.getGridState().Columns;
  }

  public getSelectedCellInfo(): SelectedCellInfo {
    return this.getGridState().SelectedCellInfo;
  }

  public getSelectedRowInfo(): SelectedRowInfo {
    return this.getGridState().SelectedRowInfo;
  }

  public getVisibleColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.Visible);
  }

  public getNumericColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Number);
  }

  public getNumericArrayColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.NumberArray);
  }

  public getDateColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Date);
  }

  public getStringColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.String);
  }

  public getBooleanColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Boolean);
  }

  public getColumnsOfType(dataType: DataType): AdaptableColumn[] {
    switch (dataType) {
      case DataType.Boolean:
        return this.getBooleanColumns();
      case DataType.Date:
        return this.getDateColumns();
      case DataType.Number:
        return this.getNumericColumns();
      case DataType.NumberArray:
        return this.getNumericArrayColumns();
      case DataType.String:
        return this.getStringColumns();
      case DataType.All:
      default:
        return this.getColumns();
    }
  }

  public getCellDisplayValue(primaryKeyValue: any, columnId: string): string {
    return this.adaptable.getDisplayValue(primaryKeyValue, columnId);
  }

  public hideFilterForm(): void {
    this.adaptable.hideFilterForm();
  }

  public applyGridFiltering(): void {
    this.adaptable.applyGridFiltering();
  }

  public clearGridFiltering(): void {
    this.adaptable.clearGridFiltering();
  }

  public getColumnSorts(): ColumnSort[] {
    return this.getGridState().ColumnSorts;
  }

  public getVendorGrid(): any {
    return this.adaptable.adaptableOptions.vendorGrid;
  }

  public getadaptableOptions(): AdaptableOptions {
    return this.adaptable.adaptableOptions;
  }

  public sortAdaptable(columnSorts: ColumnSort[]): void {
    this.adaptable.setColumnSort(columnSorts);
    this.adaptable.api.internalApi.setColumnSorts(columnSorts);
  }
}
