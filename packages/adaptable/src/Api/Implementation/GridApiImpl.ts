import { ApiBase } from './ApiBase';
import { GridApi } from '../GridApi';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { GridState } from '../../PredefinedConfig/GridState';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../../PredefinedConfig/Selection/SelectedCellInfo';
import { SelectedRowInfo } from '../../PredefinedConfig/Selection/SelectedRowInfo';
import { GridCell } from '../../PredefinedConfig/Selection/GridCell';
import { AdaptableOptions, Layout } from '../../types';
import { ColumnSort } from '../../PredefinedConfig/Common/ColumnSort';
import * as GridRedux from '../../Redux/ActionsReducers/GridRedux';
import { LoggingHelper } from '../../Utilities/Helpers/LoggingHelper';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { AG_GRID_GROUPED_COLUMN } from '../../Utilities/Constants/GeneralConstants';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';

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

  public getSelectedCellInfo(): SelectedCellInfo {
    return this.getGridState().SelectedCellInfo;
  }

  public getSelectedRowInfo(): SelectedRowInfo {
    return this.getGridState().SelectedRowInfo;
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

  public getVendorGrid(): any {
    return this.adaptable.adaptableOptions.vendorGrid;
  }

  public setColumnSorts(columnSorts: ColumnSort[]): void {
    this.dispatchAction(GridRedux.GridSetSort(columnSorts));
  }

  public getColumnSorts(): ColumnSort[] {
    return this.getAdaptableState().Grid.ColumnSorts;
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

  public isGridPivotable(): boolean {
    return this.adaptable.isPivotable();
  }
  public isGridGroupable(): boolean {
    return this.adaptable.isGroupable();
  }

  public showQuickFilterBar(): void {
    this.dispatchAction(GridRedux.QuickFilterBarShow());
  }

  public hideQuickFilterBar(): void {
    this.dispatchAction(GridRedux.QuickFilterBarHide());
  }

  public destroy() {
    this.adaptable.destroy();
  }
}
