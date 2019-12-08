import * as Redux from 'redux';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { ApiBase } from './ApiBase';
import { GridApi } from '../GridApi';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { GridState } from '../../PredefinedConfig/GridState';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';
import { DataChangedInfo } from '../../BlotterOptions/CommonObjects/DataChangedInfo';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import ObjectFactory from '../../Utilities/ObjectFactory';
import { IUIConfirmation } from '../../Utilities/Interface/IMessage';
import { AdaptableBlotterOptions } from '../../types';

export class GridApiImpl extends ApiBase implements GridApi {
  public getGridState(): GridState {
    return this.getBlotterState().Grid;
  }

  public setGridData(dataSource: any): void {
    this.blotter.setDataSource(dataSource);
  }

  public updateGridData(dataRows: any[]): void {
    this.blotter.updateRows(dataRows);
  }

  public addGridData(dataRows: any[]): void {
    this.blotter.addRows(dataRows);
  }

  public deleteGridData(dataRows: any[]): void {
    if (this.checkArrayExists(dataRows)) {
      this.blotter.deleteRows(dataRows);
    }
  }

  public setCellValue(
    columnId: string,
    newValue: any,
    primaryKeyValue: any,
    validateChange: boolean = true
  ): void {
    let gridCell: GridCell = {
      primaryKeyValue: primaryKeyValue,
      columnId: columnId,
      value: newValue,
    };
    this.setGridCell(gridCell, validateChange);
  }

  public setGridCell(gridCell: GridCell, validateChange: boolean = true): void {
    let dataChangedInfo: DataChangedInfo = this.createDataChangedInfoFromGridCell(gridCell);
    if (validateChange) {
      if (!this.blotter.ValidationService.PerformCellValidation(dataChangedInfo)) {
        return;
      }
    }

    const onServerValidationCompleted = () => {
      this.blotter.setValue(dataChangedInfo);
    };

    const mimicPromise = this.blotter.blotterOptions.editOptions!.validateOnServer
      ? this.blotter.ValidationService.PerformServerValidation(dataChangedInfo, {
          onServerValidationCompleted,
        })
      : onServerValidationCompleted;

    mimicPromise();
  }

  private createDataChangedInfoFromGridCell(gridCell: GridCell): DataChangedInfo {
    let currentValue = this.blotter.getDisplayValue(gridCell.primaryKeyValue, gridCell.columnId);
    let currentRowNode = this.blotter.getRowNodeForPrimaryKey(gridCell.primaryKeyValue);
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

  public getColumns(): AdaptableBlotterColumn[] {
    return this.getGridState().Columns;
  }

  public getSelectedCellInfo(): SelectedCellInfo {
    return this.getGridState().SelectedCellInfo;
  }

  public getSelectedRowInfo(): SelectedRowInfo {
    return this.getGridState().SelectedRowInfo;
  }

  public getVisibleColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.Visible);
  }

  public getNumericColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Number);
  }

  public getNumericArrayColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.NumberArray);
  }

  public getDateColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Date);
  }

  public getStringColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.String);
  }

  public getBooleanColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Boolean);
  }

  public getColumnsOfType(dataType: DataType): AdaptableBlotterColumn[] {
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

  public getCellDisplayValue(id: any, columnId: string): string {
    return this.blotter.getDisplayValue(id, columnId);
  }

  public getColumnSorts(): ColumnSort[] {
    return this.getGridState().ColumnSorts;
  }

  public getVendorGrid(): any {
    return this.blotter.blotterOptions.vendorGrid;
  }

  public getBlotterOptions(): AdaptableBlotterOptions {
    return this.blotter.blotterOptions;
  }
}
