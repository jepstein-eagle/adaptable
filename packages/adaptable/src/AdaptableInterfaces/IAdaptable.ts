import { AdaptableOptions, AdaptablePlugin, AdaptableMenuItem, MenuInfo } from '../types';
import { IAdaptableStore } from '../Redux/Store/Interface/IAdaptableStore';
import { IStrategyCollection } from '../Strategy/Interface/IStrategy';
import { IDataService } from '../Utilities/Services/Interface/IDataService';
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { IAuditLogService } from '../Utilities/Services/Interface/IAuditLogService';
import { ICalculatedColumnExpressionService } from '../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../Utilities/Services/Interface/IChartService';
import { IScheduleService } from '../Utilities/Services/Interface/IScheduleService';
import { ISearchService } from '../Utilities/Services/Interface/ISearchService';
import { GridCell } from '../PredefinedConfig/Selection/GridCell';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
import { CellValueType } from '../PredefinedConfig/Common/Enums';
import { Layout } from '../PredefinedConfig/LayoutState';
import { FreeTextColumn } from '../PredefinedConfig/FreeTextColumnState';
import { CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';
import { ActionColumn } from '../PredefinedConfig/ActionColumnState';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { IPPStyle } from '../Utilities/Interface/IPPStyle';
import { AdaptableTheme } from '../PredefinedConfig/ThemeState';
import { IReportService } from '../Utilities/Services/Interface/IReportService';
import { AdaptableApi } from '../Api/AdaptableApi';
import { DataChangedInfo } from '../PredefinedConfig/Common/DataChangedInfo';
import { ILayoutService } from '../Utilities/Services/Interface/ILayoutService';
import { IStyleService } from '../Utilities/Services/Interface/IStyleService';
import { IStrategyService } from '../Utilities/Services/StrategyService';
import { ColumnSort } from '../PredefinedConfig/Common/ColumnSort';
import { GradientColumn } from '../PredefinedConfig/GradientColumnState';
import { UserFunction } from '../AdaptableOptions/UserFunctions';
import { Report } from '../PredefinedConfig/ExportState';
import { KeyValuePair } from '../Utilities/Interface/KeyValuePair';

/**
 *  The only interface for Adaptable
 *
 *  Contains all the properties and methods that each implemenation must include
 *
 * Should only be used internally as all external access is via the Api
 */
export interface IAdaptable {
  api: AdaptableApi;

  adaptableOptions: AdaptableOptions;

  adaptableStore: IAdaptableStore;

  strategies: IStrategyCollection;

  vendorGridName: 'agGrid' | 'Hypergrid';

  /**
   * Whether the vendor grid has its own column menu that we need to use (e.g. ag-Grid Enterprise) or doesnt in which case we build one (e.g. hypergrid)
   *
   * Note: if ag-Grid is using community or menu is not added then this should be true.
   */
  embedColumnMenu: boolean;

  /**
   * Set when Adaptable is fully initialised
   *
   * Avoid unnecessary store calls and rendering
   */
  isInitialised: boolean;

  /**
   * Adaptable contains a number of 'Services' which are created at Startup
   *
   * Each takes an instance of Adaptable and is used when it is preferable to accessing a Strategy directly
   */
  DataService: IDataService;
  ValidationService: IValidationService;
  AuditLogService: IAuditLogService;
  CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
  ChartService: IChartService;
  ScheduleService: IScheduleService;
  SearchService: ISearchService;
  ReportService: IReportService;
  StyleService: IStyleService;
  LayoutService: ILayoutService;
  StrategyService: IStrategyService;

  // These are private events only
  _on(eventName: 'CellsSelected', callback: () => void): () => void;
  _on(eventName: 'RowsSelected', callback: () => void): () => void;
  _on(eventName: 'SearchApplied', callback: () => void): () => void;
  _on(eventName: 'GridRefreshed', callback: () => void): () => void;
  _on(eventName: 'GridFiltered', callback: () => void): () => void;
  _on(eventName: 'SortChanged', callback: (columnSorts: ColumnSort[]) => void): () => void;
  _on(eventName: 'SpecialColumnAdded', callback: () => void): () => void;
  _on(eventName: 'ColumnResized', callback: (colId: string) => void): () => void;
  _on(eventName: 'KeyDown', callback: (keyDownEvent: any) => void): () => void;

  // General
  redraw(): void;
  redrawRow(rowNode: any): void;
  refreshCells(rowNodes: any[], columnIds: string[]): void;
  jumpToRow(rowNode: any): void;
  jumpToColumn(columnId: string): void;
  jumpToCell(columnId: string, rowNode: any): void;

  // DataSource Management
  setDataSource(dataSource: any): void;
  loadDataSource(dataSource: any): void;
  updateRows(
    dataRows: any[],
    config?: { batchUpdate?: boolean; callback?: (res: any) => void }
  ): void;
  addRows(dataRows: any[]): void;
  deleteRows(dataRows: any[]): void;

  // cell / column selection
  getActiveCell(): GridCell;
  selectColumn(columnId: string): void;
  selectColumns(columnIds: string[]): void;
  selectAll(): void;
  hideColumn(columnId: string): void;
  showColumn(columnId: string): void;

  // column related
  updateColumnsIntoStore(): void;
  setColumnOrder(visibleColumnList: string[]): void;

  // getting rowNode and keys
  getPrimaryKeyValueFromRowNode(rowNode: any): any;
  getColumnValueDisplayValuePairList(
    columnId: string,
    visibleRowsOnly: boolean,
    onlyIncludeIds?: { [key: string]: boolean }
  ): any[];
  getDistinctValuesForColumn(
    columnId: string,
    cellValueType: CellValueType,
    visibleRowsOnly: boolean
  ): any[];
  getDisplayValue(id: any, columnId: string): string;
  getValueFromRowNode(rowwNode: any, columnId: string, cellValueType: CellValueType): string;
  getRawValueFromRowNode(rowwNode: any, columnId: string): any;

  getDataRowFromRowNode(rowNode: any): any;
  getRowNodesForPrimaryKeys(primaryKeyValues: any[]): any[];
  getRowNodeForPrimaryKey(primaryKeyValue: any): any;

  forPlugins(callback: (plugin: AdaptablePlugin) => any): void;

  lookupPlugins(propertyName: string, ...args: any): any;
  getPluginProperty(pluginId: string, propertyName: string, ...args: any): any;
  getPlugin(pluginId: string): AdaptablePlugin;

  // editing related
  setValue(dataChangedInfo: DataChangedInfo, internalUpdate: boolean): void;
  cancelEdit(): any;
  gridHasCurrentEditValue(): boolean;
  getCurrentCellEditValue(): any;

  // Row Methods
  getFirstRowNode(): any;
  forAllRowNodesDo(func: (rowNode: any) => any): void;
  forAllVisibleRowNodesDo(func: (rowNode: any) => any): void;
  isGroupRowNode(rowNode: any): boolean;
  selectNodes(rowNodes: any[]): void;
  selectNode(rowNode: any): void;
  getFirstGroupedColumn(): AdaptableColumn | undefined;

  //  Sort
  setCustomSort(columnId: string, comparer: Function): void;
  removeCustomSort(columnId: string): void;
  setColumnSort(columnSorts: ColumnSort[]): void;
  //sortLayout(layout: Layout):void;

  // FreeTextColumn
  addFreeTextColumnToGrid(freeTextColumn: FreeTextColumn, _colDefs?: any[]): void;
  addFreeTextColumnsToGrid(freeTextColumns: FreeTextColumn[], colDefs?: any[]): void;
  tryRemoveFreeTextColumnFromGrid(freeTextColumnId: string): boolean;
  editFreeTextColumnInGrid(freeTextColumn: FreeTextColumn): void;

  // CalculatedColumn
  addCalculatedColumnToGrid(calculatedColumn: CalculatedColumn): void;
  addCalculatedColumnsToGrid(calculatedColumns: CalculatedColumn[], _colDefs?: any[]): void;
  tryRemoveCalculatedColumnFromGrid(calculatedColumnId: string): boolean;
  editCalculatedColumnInGrid(calculatedColumn: CalculatedColumn): void;

  // actionColumn
  addActionColumnsToGrid(actionColumns: ActionColumn[]): void;

  // formatolumn
  applyFormatColumnDisplayFormats(): void;

  // Percent Bar
  removePercentBar(percentBar: PercentBar): void;
  addPercentBar(percentBar: PercentBar): void;
  editPercentBar(percentBar: PercentBar): void;

  // Gradient Column
  removeGradientColumn(gradientColumn: GradientColumn): void;
  addGradientColumn(gradientColumn: GradientColumn): void;
  editGradientColumn(gradientColumn: GradientColumn): void;

  // sparklines
  addSparklineColumn(sparklineColumn: SparklineColumn): void;
  removeSparklineColumn(sparklineColumn: SparklineColumn): void;
  editSparklineColumn(sparklineColumn: SparklineColumn): void;

  // Filtering
  hideFilterForm(): void;
  applyGridFiltering(): void;
  clearGridFiltering(): void;
  clearColumnFiltering(columnIds: string[]): void;

  // Reports
  canExportToExcel(): boolean;
  exportToExcel(columnNames: string[], data: any[], fileName: string): void;
  exportVisibleToClipboard(report: Report): void;
  exportVisibleToExcel(report: Report): void;
  exportVisibleToCsv(report: Report): void;

  // TEMPORARY : JO
  getCurrentIPPStyle(): IPPStyle;
  getDefaultIPPStyle(): IPPStyle;

  // info
  getRowCount(): number;
  getColumnCount(): number;
  getVisibleRowCount(): number;
  getVisibleColumnCount(): number;

  // layout
  setLayout(layout: Layout): void;

  // vendor grid related
  isSelectable(): boolean;
  isGroupable(): boolean;
  isPivotable(): boolean;

  // quick filter
  showQuickFilter(): void;
  hideQuickFilter(): void;
  isQuickFilterActive(): boolean;

  // Theme
  getVendorGridLightThemeName(): string;
  getVendorGridCurrentThemeName(): string;
  applyAdaptableTheme(theme: AdaptableTheme | string): void;
  setUpRowStyles(): void; // not sure about this...
  clearRowStyles(): void; // not sure about this...

  // User Functions
  // there is a bug in Typescript
  // duplicating the definition fixes the issue for now
  // https://github.com/Microsoft/TypeScript/issues/30071
  getUserFunctionHandler<T extends UserFunction['type']>(
    type: T,
    name: string
  ): Extract<UserFunction, { type: T }>['handler'] | null;
  getUserFunctionHandler<T extends UserFunction['type']>(
    type: T,
    name: string
  ): Extract<UserFunction, { type: T }>['handler'] | null;

  /**
   * called when you want to destroy the instance & cleanup resources
   */
  destroy(config?: { unmount: boolean; destroyApi?: boolean }): void;

  expandAllRowGroups(): void;
  closeAllRowGroups(): void;
  expandRowGroupsForValues(columnValues: any[]): void;
  getExpandRowGroupsKeys(): any[];

  buildStandaloneColumnHeader(adaptableColumn: AdaptableColumn): AdaptableMenuItem[];

  isSharedQueryReferenced(sharedQueryId: string): boolean;
}
