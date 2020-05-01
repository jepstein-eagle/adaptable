import { ApiBase } from './ApiBase';
import { GridApi } from '../GridApi';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { GridState } from '../../PredefinedConfig/GridState';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../PredefinedConfig/Selection/SelectedRowInfo';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
import { AdaptableOptions } from '../../types';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';

export class GridApiImpl extends ApiBase implements GridApi {
  public getGridState(): GridState {
    return this.getAdaptableState().Grid;
  }

  public setGridData(dataSource: any): void {
    this.adaptable.setDataSource(dataSource);
  }

  public loadGridData(dataSource: any): void {
    this.adaptable.loadDataSource(dataSource);
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

  public setCellValue(
    columnId: string,
    newValue: any,
    primaryKeyValue: any,
    forceFilter: boolean = false
  ): void {
    let gridCell: GridCell = {
      primaryKeyValue: primaryKeyValue,
      columnId: columnId,
      rawValue: newValue,
      displayValue: newValue,
    };
    this.adaptable.api.internalApi.setGridCell(gridCell, forceFilter, false);
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

  public setColumnSorts(columnSorts: ColumnSort[]): void {
    this.dispatchAction(GridRedux.GridSetSort(columnSorts));
  }

  public getColumnSorts(): ColumnSort[] {
    return this.getAdaptableState().Grid.ColumnSorts;
  }

  public getVendorGrid(): any {
    return this.adaptable.adaptableOptions.vendorGrid;
  }

  public getadaptableOptions(): AdaptableOptions {
    return this.adaptable.adaptableOptions;
  }

  public sortAdaptable(columnSorts: ColumnSort[]): void {
    this.adaptable.setColumnSort(columnSorts);
    this.setColumnSorts(columnSorts);
  }

  public selectNodes(rowNodes: any[]): void {
    this.adaptable.selectNodes(rowNodes);
  }

  public selectNode(rowNode: any): void {
    this.adaptable.selectNode(rowNode);
  }

  public selectColumn(columnId: string): void {
    this.adaptable.selectColumn(columnId);
  }

  public selectColumns(columnIds: string[]): void {
    this.adaptable.selectColumns(columnIds);
  }

  public getFirstRowNode(): any {
    return this.adaptable.getFirstRowNode();
  }

  public getRowNodesForPrimaryKeys(primaryKeyValues: any[]): any[] {
    return this.adaptable.getRowNodesForPrimaryKeys(primaryKeyValues);
  }
  public getRowNodeForPrimaryKey(primaryKeyValue: any): any {
    return this.adaptable.getRowNodeForPrimaryKey(primaryKeyValue);
  }

  public expandAllRowGroups(): void {
    this.adaptable.expandAllRowGroups();
  }

  public closeAllRowGroups(): void {
    this.adaptable.closeAllRowGroups();
  }

  public getExpandRowGroupsKeys(): any[] {
    return this.adaptable.getExpandRowGroupsKeys();
  }

  public expandRowGroupsForValues(columnValues: any[]): void {
    this.adaptable.expandRowGroupsForValues(columnValues);
  }
}
