import { ApiBase } from './ApiBase';
import { GridApi } from '../GridApi';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { GridState } from '../../PredefinedConfig/GridState';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { DataChangedInfo } from '../../AdaptableOptions/CommonObjects/DataChangedInfo';
import { AdaptableOptions } from '../../types';

export class GridApiImpl extends ApiBase implements GridApi {
  public getGridState(): GridState {
    return this.getAdaptableState().Grid;
  }

  public setGridData(dataSource: any): void {
    this.adaptable.setDataSource(dataSource);
  }

  public updateGridData(dataRows: any[]): void {
    this.adaptable.updateRows(dataRows);
  }

  public addGridData(dataRows: any[]): void {
    this.adaptable.addRows(dataRows);
  }

  public deleteGridData(dataRows: any[]): void {
    if (this.checkArrayExists(dataRows)) {
      this.adaptable.deleteRows(dataRows);
    }
  }

  public setCellValue(
    columnId: string,
    newValue: any,
    primaryKeyValue: any,
    reselectSelectedCells: boolean,
    validateChange: boolean = true
  ): void {
    let gridCell: GridCell = {
      primaryKeyValue: primaryKeyValue,
      columnId: columnId,
      value: newValue,
    };
    this.setGridCell(gridCell, reselectSelectedCells, validateChange);
  }

  public setGridCell(
    gridCell: GridCell,
    reselectSelectedCells: boolean,
    validateChange: boolean = true
  ): void {
    let dataChangedInfo: DataChangedInfo = this.createDataChangedInfoFromGridCell(gridCell);
    if (validateChange) {
      if (!this.adaptable.ValidationService.PerformCellValidation(dataChangedInfo)) {
        return;
      }
    }

    const onServerValidationCompleted = () => {
      this.adaptable.setValue(dataChangedInfo, reselectSelectedCells);
    };

    const mimicPromise = this.adaptable.adaptableOptions.editOptions!.validateOnServer
      ? this.adaptable.ValidationService.PerformServerValidation(dataChangedInfo, {
          onServerValidationCompleted,
        })
      : onServerValidationCompleted;

    mimicPromise();
  }

  private createDataChangedInfoFromGridCell(gridCell: GridCell): DataChangedInfo {
    let currentValue = this.adaptable.getDisplayValue(gridCell.primaryKeyValue, gridCell.columnId);
    let currentRowNode = this.adaptable.getRowNodeForPrimaryKey(gridCell.primaryKeyValue);
    let dataChangedInfo: DataChangedInfo = {
      OldValue: currentValue,
      NewValue: gridCell.value,
      ColumnId: gridCell.columnId,
      PrimaryKeyValue: gridCell.primaryKeyValue,
      RowNode: currentRowNode,
    };
    return dataChangedInfo;
  }

  public setGridCells(gridCells: GridCell[], validateChange: boolean): void {
    gridCells.forEach(gc => {
      this.setGridCell(gc, validateChange);
    });
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
}
