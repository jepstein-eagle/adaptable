import { IBlotterApi, AdaptableBlotterOptions } from '../types';
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
import { IColumn } from '../Utilities/Interface/IColumn';
import { IRawValueDisplayValuePair } from '../View/UIInterfaces';
import { DistinctCriteriaPairValue } from '../PredefinedConfig/Common/Enums';
import { ColumnSort, VendorGridInfo } from '../PredefinedConfig/RunTimeState/LayoutState';
import { FreeTextColumn } from '../PredefinedConfig/RunTimeState/FreeTextColumnState';
import { CalculatedColumn } from '../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { ActionColumn } from '../PredefinedConfig/DesignTimeState/ActionColumnState';
import { PercentBar } from '../PredefinedConfig/RunTimeState/PercentBarState';
import { SparklineColumn } from '../PredefinedConfig/DesignTimeState/SparklineColumnState';
import { IPPStyle } from '../Utilities/Interface/Reports/IPPStyle';
import { AdaptableBlotterTheme } from '../PredefinedConfig/RunTimeState/ThemeState';


export type EmitterCallback = (data?: any) => any;

/**
 *  The only interface for the AdaptableBlotter
 *  Contains all the properties and methods that each implemenation must include
 *  Each implemenation has a constructor that contains an AdaptableBlotterOptions object.
 *  This object contains a number of properties including 'vedorGrid' which is the underlying grid that they use
 */
export interface IAdaptableBlotter {
  /**
   * The api - the main way to access our store in a way that ensures that things stay immutable
   * Ideally ALL access to and from the Store should be via api methods
   */
  api: IBlotterApi;

  /**
   * The main configuration object which contains all the options that users needs to set up the Blotter
   * Most properties are nullable with sensible defaults provided in DefaultBlotterOptions that is merged at initialisation
   * Each implementation of the Adaptable Blotter has a constructor that contains an AdaptableBlotterOptions object.
   * This object contains a number of properties including 'vedorGrid' which is the underlying grid that they use and the way that we can access the underlying grid and its data
   */
  blotterOptions: AdaptableBlotterOptions;

  /**
   * The redux store that we use to manage state
   * Ideally all access to and from the store should be via the api but this is not yet done in practice
   */
  adaptableBlotterStore: IAdaptableBlotterStore;

  /**
   * Each set of functionality in the Adaptable Blotter is called a strategy (e.g. Quick Search, Export)
   * There are about 30 strategies in total
   * Users are able to set through Predefined Config which ones are available (default), ReadOnly or Hidden
   * Each strategy currently manages the State relevant to it and reacts to any changes (this might change?)
   */
  strategies: IStrategyCollection;

  /**
   * The name of the underlying vendor grid - only used in the about page
   */
  vendorGridName: 'agGrid' | 'Hypergrid';

  /**
   * Whethere the vendor grid has its own column menu that we need to use (e.g. ag-Grid) or doesnt in which case we build one (e.g. hypergrid)
   */
  embedColumnMenu: boolean;

  /**
   * Set when the Blotter is fully initialised
   * Avoid unnecessary store calls and rendering
   */
  isInitialised: boolean;

  /**
   * The Adaptable Blotter contains a number of 'Services' which are created at Startup
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

  // Used for internal events...
  on(eventName: string, callback: EmitterCallback): void;
  emit(eventName: string, data?: any): Promise<any>;

  // General
  createMainMenu(): void;
  setGridData(dataSource: any): void;
  reloadGrid(): void;
  redraw(): void;

  // cell / column selection
  getActiveCell(): GridCell;
  selectColumn(columnId: string): void;

  // column related
  setColumnIntoStore(): void;
  setNewColumnListOrder(visibleColumnList: Array<IColumn>): void;

  // getting records and keys
  getPrimaryKeyValueFromRecord(record: any): any;
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
  getDisplayValueFromRecord(row: any, columnId: string): string;
  getRawValueFromRecord(row: any, columnId: string): any;
  getRecordIsSatisfiedFunction(
    id: any,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any;
  getRecordIsSatisfiedFunctionFromRecord(
    record: any,
    distinctCriteria: DistinctCriteriaPairValue
  ): (columnId: string) => any;
  getDisplayValueFromRawValue(columnId: string, rawValue: any): any;
  getDataRowFromRecord(record: any): any;
  getRecordsForPrimaryKeys(primaryKeyValues: any[]): any[];

  // editing related
  setValue(gridCell: GridCell): void;
  setValueBatch(gridCellBatch: GridCell[]): void;
  cancelEdit(): any;
  gridHasCurrentEditValue(): boolean;
  getCurrentCellEditValue(): any;

  // Row Methods
  getFirstRecord(): any;
  forAllRecordsDo(func: (record: any) => any): void;
  forAllVisibleRecordsDo(func: (record: any) => any): void;
  isGroupRecord(record: any): boolean;

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
  hasQuickFilter: boolean;
  showQuickFilter(): void;
  hideQuickFilter(): void;

  // Theme
  applyBlotterTheme(theme: AdaptableBlotterTheme | string): void;
}
