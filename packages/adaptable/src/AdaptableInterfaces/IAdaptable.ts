import { AdaptableOptions, AdaptablePlugin } from '../types';
import { IAdaptableStore } from '../Redux/Store/Interface/IAdaptableStore';
import { IStrategyCollection, IStrategy } from '../Strategy/Interface/IStrategy';
import { ICalendarService } from '../Utilities/Services/Interface/ICalendarService';
import { IDataService } from '../Utilities/Services/Interface/IDataService';
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { IAuditLogService } from '../Utilities/Services/Interface/IAuditLogService';
import { ICalculatedColumnExpressionService } from '../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../Utilities/Services/Interface/IChartService';
import { IScheduleService } from '../Utilities/Services/Interface/IScheduleService';
import { ISearchService } from '../Utilities/Services/Interface/ISearchService';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { AdaptableColumn } from '../PredefinedConfig/Common/AdaptableColumn';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
import { DistinctCriteriaPairValue, SortOrder } from '../PredefinedConfig/Common/Enums';
import { VendorGridInfo, PivotDetails } from '../PredefinedConfig/LayoutState';
import { FreeTextColumn } from '../PredefinedConfig/FreeTextColumnState';
import { CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';
import { ActionColumn } from '../PredefinedConfig/ActionColumnState';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { IPPStyle } from '../Utilities/Interface/IPPStyle';
import { AdaptableTheme } from '../PredefinedConfig/ThemeState';
import { IGlue42Service } from '../Utilities/Services/Interface/IGlue42Service';
import { IPushPullService } from '../Utilities/Services/Interface/IPushPullService';

import { IReportService } from '../Utilities/Services/Interface/IReportService';
import { AdaptableApi } from '../Api/AdaptableApi';
import { DataChangedInfo } from '../AdaptableOptions/CommonObjects/DataChangedInfo';
import { ILayoutService } from '../Utilities/Services/Interface/ILayoutService';
import { IStyleService } from '../Utilities/Services/Interface/IStyleService';
import { IStrategyService } from '../Utilities/Services/StrategyService';
import { IFilterService } from '../Utilities/Services/Interface/IFilterService';
import { ColumnSort } from '../PredefinedConfig/Common/ColumnSort';

/**
 *  The only interface for Adaptable
 *
 *  Contains all the properties and methods that each implemenation must include
 *
 *  Each implemenation has a constructor that contains an AdaptableOptions object.
 *
 *  This object contains a number of properties including 'vedorGrid' which is the underlying grid that they use
 *
 *  It also contains an api property which gives access to Adaptable API - this is the ONLY way that developers should access Adaptable methods.
 */
export interface IAdaptable {
  /**
   * The api - the main way to access our store in a way that ensures that things stay immutable.
   *
   * Ideally ALL access to and from the Store should be via api methods.
   *
   * Likewise ALL access to methods in Adaptable by external developers should be via the API
   */
  api: AdaptableApi;

  /**
   * The main configuration object which contains all the options that users needs to set up Adaptable.
   *
   * Most properties are nullable with sensible defaults provided in DefaultAdaptableOptions that is merged at initialisation.
   *
   * Adaptable's static constructor receives AdaptableOptions object.
   *
   * This object contains a number of properties including 'vedorGrid' which is the underlying grid that they use and the way that we can access the underlying grid and its data
   */
  adaptableOptions: AdaptableOptions;

  /**
   * The redux store that we use to manage state
   *
   * Ideally all access to and from the store should be via Adaptable API and this store should NOT be accessed directly.
   */
  AdaptableStore: IAdaptableStore;

  /**
   * Each set of functionality in Adaptable is called a strategy (e.g. Quick Search, Export)
   *
   * There are about 30 strategies in total
   *
   * Users are able to set through Predefined Config which ones are available (default), ReadOnly or Hidden
   *
   * Each strategy currently manages the State relevant to it and reacts to any changes (this might change?)
   */
  strategies: IStrategyCollection;

  /**
   * The name of the underlying vendor grid - only used in the about page
   */
  vendorGridName: 'agGrid' | 'Hypergrid';

  /**
   * Whether the vendor grid has its own column menu that we need to use (e.g. ag-Grid) or doesnt in which case we build one (e.g. hypergrid)
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
  CalendarService: ICalendarService;
  DataService: IDataService;
  ValidationService: IValidationService;
  AuditLogService: IAuditLogService;
  CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
  ChartService: IChartService;
  ScheduleService: IScheduleService;
  SearchService: ISearchService;
  Glue42Service: IGlue42Service;
  PushPullService: IPushPullService;
  ReportService: IReportService;
  StyleService: IStyleService;
  LayoutService: ILayoutService;
  StrategyService: IStrategyService;
  FilterService: IFilterService;

  // These are private events only
  _on(eventName: 'CellsSelected', callback: () => void): () => void;
  _on(eventName: 'RowsSelected', callback: () => void): () => void;
  _on(eventName: 'SearchApplied', callback: () => void): () => void;
  _on(eventName: 'GridRefreshed', callback: () => void): () => void;
  _on(eventName: 'GridReloaded', callback: () => void): () => void;
  _on(eventName: 'ColumnResized', callback: (colId: string) => void): () => void;
  _on(eventName: 'KeyDown', callback: (keyDownEvent: any) => void): () => void;

  // onAny(callback: EmitterCallback): () => void;
  //emit(eventName: string, data?: any): Promise<any>;

  // General
  createFunctionMenu(): void;
  reloadGrid(): void;
  redraw(): void;
  redrawRow(rowNode: any): void;
  refreshCells(rowNodes: any[], columnIds: string[]): void;
  jumpToRow(rowNode: any): void;
  jumpToColumn(columnId: string): void;
  jumpToCell(columnId: string, rowNode: any): void;

  // DataSource Management
  setDataSource(dataSource: any): void;
  updateRows(
    dataRows: any[],
    config?: { batchUpdate?: boolean; callback?: (res: any) => void }
  ): void;
  addRows(dataRows: any[]): void;
  deleteRows(dataRows: any[]): void;

  // cell / column selection
  getActiveCell(): GridCell;
  selectColumn(columnId: string): void;

  // column related
  setColumnIntoStore(): void;
  setNewColumnListOrder(visibleColumnList: Array<AdaptableColumn>): void;

  // getting rowNode and keys
  getPrimaryKeyValueFromRowNode(rowNode: any): any;
  getColumnValueDisplayValuePairList(
    columnId: string,
    visibleRowsOnly: boolean,
    onlyIncludeIds?: { [key: string]: boolean }
  ): Array<IRawValueDisplayValuePair>;
  getColumnValueDisplayValuePairDistinctList(
    columnId: string,
    distinctCriteria: DistinctCriteriaPairValue,
    visibleRowsOnly: boolean
  ): Array<IRawValueDisplayValuePair>;
  getDisplayValue(id: any, columnId: string): string;
  getDisplayValueFromRowNode(rowwNode: any, columnId: string): string;
  getRawValueFromRowNode(rowwNode: any, columnId: string): any;
  getRowNodeIsSatisfiedFunction(
    id: any,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any;
  getRowNodeIsSatisfiedFunctionFromRowNode(
    rowNode: any,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any;
  getDisplayValueFromRawValue(columnId: string, rawValue: any): any;
  getDataRowFromRowNode(rowNode: any): any;
  getRowNodesForPrimaryKeys(primaryKeyValues: any[]): any[];
  getRowNodeForPrimaryKey(primaryKeyValue: any): any;

  forPlugins(callback: (plugin: AdaptablePlugin) => any): void;

  lookupPlugins(propertyName: string, ...args: any): any;

  // editing related
  setValue(dataChangedInfo: DataChangedInfo, reselectSelectedCells: boolean): void;
  cancelEdit(): any;
  gridHasCurrentEditValue(): boolean;
  getCurrentCellEditValue(): any;

  // Row Methods
  getFirstRowNode(): any;
  forAllRowNodesDo(func: (rowNode: any) => any): void;
  forAllVisibleRowNodesDo(func: (rowNode: any) => any): void;
  isGroupRowNode(rowNode: any): boolean;

  //  Sort
  setCustomSort(columnId: string, comparer: Function): void;
  removeCustomSort(columnId: string): void;
  setColumnSort(columnSorts: ColumnSort[]): void;

  // FreeTextColumn
  addFreeTextColumnToGrid(freeTextColumn: FreeTextColumn): void;
  removeFreeTextColumnFromGrid(freeTextColumnId: string): void;
  editFreeTextColumnInGrid(freeTextColumn: FreeTextColumn): void;

  // CalculatedColumn
  addCalculatedColumnToGrid(calculatedColumn: CalculatedColumn): void;
  removeCalculatedColumnFromGrid(calculatedColumnId: string): void;
  editCalculatedColumnInGrid(calculatedColumn: CalculatedColumn): void;

  // actionColumn
  addActionColumnToGrid(actionColumn: ActionColumn): void;

  // percentBar
  removePercentBar(percentBar: PercentBar): void;
  addPercentBar(percentBar: PercentBar): void;
  editPercentBar(percentBar: PercentBar): void;

  // sparklines
  addSparklineColumn(sparklineColumn: SparklineColumn): void;
  removeSparklineColumn(sparklineColumn: SparklineColumn): void;
  editSparklineColumn(sparklineColumn: SparklineColumn): void;

  // Filtering
  hideFilterForm(): void;
  applyGridFiltering(): void;
  clearGridFiltering(): void;
  clearColumnFiltering(columnIds: string[]): void;

  // TEMPORARY : JO
  getIPPStyle(): IPPStyle;

  // info
  getRowCount(): number;
  getColumnCount(): number;
  getVisibleRowCount(): number;
  getVisibleColumnCount(): number;

  // layout
  getVendorGridLayoutInfo(visibleCols: string[]): VendorGridInfo;
  getVendorGridDefaultLayoutInfo(): VendorGridInfo;
  setVendorGridLayoutInfo(vendorGridInfo: VendorGridInfo): void;
  setGroupedColumns(groupedCols: string[]): void;
  setPivotingDetails(pivotDetails: PivotDetails): void;
  setPivotMode(pivotDetails: PivotDetails, vendorGridInfo: VendorGridInfo): void;

  // vendor grid related
  isSelectable(): boolean;

  // quick filter
  showQuickFilter(): void;
  hideQuickFilter(): void;

  // Theme
  applyAdaptableTheme(theme: AdaptableTheme | string): void;
  setUpRowStyles(): void; // not sure about this...
  clearRowStyles(): void; // not sure about this...
}
