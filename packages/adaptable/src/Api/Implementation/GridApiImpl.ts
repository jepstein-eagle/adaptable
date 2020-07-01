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

  public isSpecialColumn(columnId: string): boolean {
    return columnId == AG_GRID_GROUPED_COLUMN;
  }

  public isCalculatedColumn(columnId: string): boolean {
    return (
      this.adaptable.api.calculatedColumnApi
        .getAllCalculatedColumn()
        .find(cc => cc.ColumnId == columnId) != null
    );
  }

  public isFreeTextColumn(columnId: string): boolean {
    return (
      this.adaptable.api.freeTextColumnApi
        .getAllFreeTextColumn()
        .find(cc => cc.ColumnId == columnId) != null
    );
  }

  public isActionColumn(columnId: string): boolean {
    return (
      this.adaptable.api.actionColumnApi.getAllActionColumn().find(cc => cc.ColumnId == columnId) !=
      null
    );
  }

  public isNumericColumn(column: AdaptableColumn): boolean {
    return column.DataType == DataType.Number;
  }

  public getColumnDataTypeFromColumnId(
    columnId: string
  ): 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown' {
    return this.getColumns().find(c => c.ColumnId == columnId).DataType;
  }

  public getFriendlyNameFromColumn(columnId: string, column: AdaptableColumn): string {
    if (columnId.includes(GeneralConstants.MISSING_COLUMN)) {
      return columnId;
    }
    if (column) {
      return column.FriendlyName;
    }
    this.LogMissingColumnWarning(columnId);
    return columnId + GeneralConstants.MISSING_COLUMN;
  }

  public getFriendlyNameFromColumnId(columnId: string): string {
    const foundColumn: AdaptableColumn | undefined = this.getColumns().find(
      c => c.ColumnId == columnId
    );
    if (foundColumn) {
      return this.getFriendlyNameFromColumn(columnId, foundColumn);
    }
    this.LogMissingColumnWarning(columnId);
    return columnId + GeneralConstants.MISSING_COLUMN;
  }

  public getFriendlyNamesFromColumnIds(columnIds: string[]): string[] {
    const friendlyNames: string[] = [];
    if (ArrayExtensions.IsNullOrEmpty(columnIds)) {
      return friendlyNames;
    }
    columnIds.forEach(c => {
      friendlyNames.push(this.getFriendlyNameFromColumnId(c));
    });
    return friendlyNames;
  }

  public getColumnIdFromFriendlyName(friendlyName: string): string {
    if (friendlyName.includes(GeneralConstants.MISSING_COLUMN)) {
      return friendlyName.replace(GeneralConstants.MISSING_COLUMN, ''); // Ids should stay "pure"
    }
    const foundColumn: AdaptableColumn | undefined = this.getColumns().find(
      c => c.FriendlyName == friendlyName
    );
    if (foundColumn) {
      return foundColumn.ColumnId;
    }
    this.LogMissingColumnWarning(friendlyName);
    return friendlyName + GeneralConstants.MISSING_COLUMN;
  }

  public getColumnIdsFromFriendlyNames(friendlyNames: string[]): string[] {
    const columnIds: string[] = [];
    if (ArrayExtensions.IsNullOrEmpty(friendlyNames)) {
      return columnIds;
    }
    friendlyNames.forEach(c => {
      columnIds.push(this.getColumnIdFromFriendlyName(c));
    });
    return columnIds;
  }

  public getColumnsFromFriendlyNames(friendlyNames: string[]): AdaptableColumn[] {
    // not sure if this is right as might ignore bad cols
    return friendlyNames.map(friendlyName =>
      this.getColumns().find(x => x.FriendlyName == friendlyName)
    );
  }

  public getColumnsFromIds(columnIds: string[], logWarning = true): AdaptableColumn[] {
    let returnCols: AdaptableColumn[] = [];
    columnIds.forEach(c => {
      returnCols.push(this.getColumnFromId(c, logWarning));
    });

    return returnCols;
  }

  public getColumnFromId(columnId: string, logWarning = true): AdaptableColumn {
    // just return null if no columns rather than logging a warning - otherwise get lots at startup
    if (ArrayExtensions.IsNullOrEmpty(this.getColumns())) {
      return null;
    }
    const foundColumn: AdaptableColumn = this.getColumns().find(c => c.ColumnId == columnId);
    if (foundColumn) {
      return foundColumn;
    }
    if (logWarning) {
      this.LogMissingColumnWarning(columnId);
    }
    return null;
  }

  public getColumnFromFriendlyName(columnName: string, logWarning = true): AdaptableColumn {
    // just return null if no columns rather than logging a warning - otherwise get lots at startup
    if (ArrayExtensions.IsNullOrEmpty(this.getColumns())) {
      return null;
    }
    const foundColumn: AdaptableColumn = this.getColumns().find(c => c.FriendlyName == columnName);
    if (foundColumn) {
      return foundColumn;
    }
    if (logWarning) {
      this.LogMissingColumnWarning(columnName);
    }
    return null;
  }

  public getColumnsOfType(dataType: DataType): AdaptableColumn[] {
    switch (dataType) {
      case DataType.All:
        return this.getColumns();
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
      default:
        return this.getColumns();
    }
  }

  public getNumericColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Number);
  }

  public getNumericArrayColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.NumberArray);
  }

  public getStringColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.String);
  }

  public getDateColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Date);
  }

  public getBooleanColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Boolean);
  }

  public getSortableColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.Sortable);
  }

  public getGroupableColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.Groupable);
  }

  public getPivotableColumns(): AdaptableColumn[] {
    return this.getColumns().filter(c => c.Pivotable);
  }

  public getAggregetableColumns(): AdaptableColumn[] {
    return this.getColumns()
      .filter(c => c.Aggregatable)
      .filter(c => c.DataType == DataType.Number);
  }

  public isGridPivotable(): boolean {
    return this.adaptable.isPivotable();
  }
  public isGridGroupable(): boolean {
    return this.adaptable.isGroupable();
  }

  private LogMissingColumnWarning(columnId: string): void {
    if (
      this.adaptable.adaptableOptions.generalOptions.showMissingColumnsWarning &&
      this.adaptable.adaptableOptions.generalOptions.showMissingColumnsWarning === true
    ) {
      if (
        !this.isSpecialColumn(columnId) &&
        !this.isCalculatedColumn(columnId) &&
        !this.isFreeTextColumn(columnId) &&
        !this.isActionColumn(columnId)
      ) {
        LoggingHelper.LogAdaptableWarning(`No column found named '${columnId}'`);
      }
    }
  }

  public destroy() {
    this.adaptable.destroy();
  }
}
