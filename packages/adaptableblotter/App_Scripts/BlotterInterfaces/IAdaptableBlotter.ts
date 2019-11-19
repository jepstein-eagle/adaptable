import { AdaptableBlotterOptions } from '../types';
import { IAdaptableBlotterStore } from '../Redux/Store/Interface/IAdaptableStore';
import { IStrategyCollection } from '../Strategy/Interface/IStrategy';
import { ICalendarService } from '../Utilities/Services/Interface/ICalendarService';
import { IDataService } from '../Utilities/Services/Interface/IDataService';
import { IValidationService } from '../Utilities/Services/Interface/IValidationService';
import { IAuditLogService } from '../Utilities/Services/Interface/IAuditLogService';
import { ICalculatedColumnExpressionService } from '../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../Utilities/Services/Interface/IChartService';
import { IScheduleService } from '../Utilities/Services/Interface/IScheduleService';
import { ISearchService } from '../Utilities/Services/Interface/ISearchService';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
import { DistinctCriteriaPairValue } from '../PredefinedConfig/Common/Enums';
import { ColumnSort, VendorGridInfo } from '../PredefinedConfig/LayoutState';
import { FreeTextColumn } from '../PredefinedConfig/FreeTextColumnState';
import { CalculatedColumn } from '../PredefinedConfig/CalculatedColumnState';
import { ActionColumn } from '../PredefinedConfig/ActionColumnState';
import { PercentBar } from '../PredefinedConfig/PercentBarState';
import { SparklineColumn } from '../PredefinedConfig/SparklineColumnState';
import { IPPStyle } from '../Utilities/Interface/Reports/IPPStyle';
import { AdaptableBlotterTheme } from '../PredefinedConfig/ThemeState';
import { IGlue42Service } from '../Utilities/Services/Glue42Service';

import {
  PRIVATE_CELLS_SELECTED_EVENT,
  PRIVATE_ROWS_SELECTED_EVENT,
  PRIVATE_SEARCH_APPLIED_EVENT,
  PRIVATE_GRID_REFRESHED_EVENT,
  PRIVATE_GRID_RELOADED_EVENT,
  PRIVATE_KEY_DOWN_EVENT,
} from '../Utilities/Constants/GeneralConstants';
import { EmitterCallback } from '../Utilities/Emitter';
import { IReportService } from '../Utilities/Services/Interface/IReportService';
import { BlotterApi } from '../Api/BlotterApi';
import { DataChangedInfo } from '../BlotterOptions/CommonObjects/DataChangedInfo';

/**
 *  The only interface for the AdaptableBlotter
 *
 *  Contains all the properties and methods that each implemenation must include
 *
 *  Each implemenation has a constructor that contains an AdaptableBlotterOptions object.
 *
 *  This object contains a number of properties including 'vedorGrid' which is the underlying grid that they use
 *
 *  It also contains an api property which gives access to the Blotter API - this is the ONLY way that developers should access Adaptable Blotter methods.
 */
export interface IAdaptableBlotter {
  /**
   * The api - the main way to access our store in a way that ensures that things stay immutable.
   *
   * Ideally ALL access to and from the Store should be via api methods.
   *
   * Likewise ALL access to methods in the Blotter by external developers should be via the API
   */
  api: BlotterApi;

  /**
   * The main configuration object which contains all the options that users needs to set up the Blotter.
   *
   * Most properties are nullable with sensible defaults provided in DefaultBlotterOptions that is merged at initialisation.
   *
   * Each implementation of the Adaptable Blotter has a constructor that contains an AdaptableBlotterOptions object.
   *
   * This object contains a number of properties including 'vedorGrid' which is the underlying grid that they use and the way that we can access the underlying grid and its data
   */
  blotterOptions: AdaptableBlotterOptions;

  /**
   * The redux store that we use to manage state
   *
   * Ideally all access to and from the store should be via the Blotter API and this store should NOT be accessed directly.
   */
  adaptableBlotterStore: IAdaptableBlotterStore;

  /**
   * Each set of functionality in the Adaptable Blotter is called a strategy (e.g. Quick Search, Export)
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
   * Set when the Blotter is fully initialised
   *
   * Avoid unnecessary store calls and rendering
   */
  isInitialised: boolean;

  /**
   * The Adaptable Blotter contains a number of 'Services' which are created at Startup
   *
   * Each takes an instance of the AdaptableBlotter and is used when it is preferable to accessing a Strategy directly
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
  ReportService: IReportService;

  // These are private events only
  _on(eventName: PRIVATE_CELLS_SELECTED_EVENT, callback: () => void): () => void;
  _on(eventName: PRIVATE_ROWS_SELECTED_EVENT, callback: () => void): () => void;
  _on(eventName: PRIVATE_SEARCH_APPLIED_EVENT, callback: () => void): () => void;
  _on(eventName: PRIVATE_GRID_REFRESHED_EVENT, callback: () => void): () => void;
  _on(eventName: PRIVATE_GRID_RELOADED_EVENT, callback: () => void): () => void;
  _on(eventName: PRIVATE_KEY_DOWN_EVENT, callback: (keyDownEvent: any) => void): () => void;

  // onAny(callback: EmitterCallback): () => void;
  //emit(eventName: string, data?: any): Promise<any>;

  // General
  createMainMenu(): void;
  reloadGrid(): void;
  redraw(): void;
  redrawRow(rowNode: any): void;
  refreshCells(rowNodes: any[], columnIds: string[]): void;
  jumpToRow(rowNode: any): void;
  jumpToColumn(columnId: string): void;
  jumpToCell(columnId: string, rowNode: any): void;

  // DataSource Management
  setDataSource(dataSource: any): void;
  updateRows(dataRows: any[]): void;
  addRows(dataRows: any[]): void;
  deleteRows(dataRows: any[]): void;

  // cell / column selection
  getActiveCell(): GridCell;
  selectColumn(columnId: string): void;

  // column related
  setColumnIntoStore(): void;
  setNewColumnListOrder(visibleColumnList: Array<AdaptableBlotterColumn>): void;

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

  // editing related
  setValue(dataChangedInfo: DataChangedInfo): void;
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

  // CalculatedColumn
  addCalculatedColumnToGrid(calculatedColumn: CalculatedColumn): void;
  removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
  editCalculatedColumnInGrid(calculatedColumn: CalculatedColumn): void;

  // actionColumn
  addActionColumnToGrid(actionColumn: ActionColumn): void;

  // percentBar
  removePercentBar(percentBar: PercentBar): void;
  addPercentBar(percentBar: PercentBar): void;
  editPercentBar(percentBar: PercentBar): void;

  // sparklines
  addSparkline(sparklineColumn: SparklineColumn): void;
  removeSparkline(sparklineColumn: SparklineColumn): void;
  editSparkline(sparklineColumn: SparklineColumn): void;

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
  getVendorGridInfo(visibleCols: string[], forceFetch: boolean): VendorGridInfo;
  setVendorGridInfo(vendorGridInfo: VendorGridInfo): void;

  // vendor grid related
  isSelectable(): boolean;

  // quick filter
  showQuickFilter(): void;
  hideQuickFilter(): void;

  // Theme
  applyBlotterTheme(theme: AdaptableBlotterTheme | string): void;
  setUpRowStyles(): void; // not sure about this...
  clearRowStyles(): void; // not sure about this...
}
