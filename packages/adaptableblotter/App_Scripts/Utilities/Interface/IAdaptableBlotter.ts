import { DistinctCriteriaPairValue } from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IColumn } from './IColumn';

import { IBlotterApi } from '../../Api/Interface/IBlotterApi';
import { AdaptableBlotterOptions } from '../../BlotterOptions/AdaptableBlotterOptions';
import { ICalendarService } from '../Services/Interface/ICalendarService';
import { IDataService } from '../Services/Interface/IDataService';
import { IValidationService } from '../Services/Interface/IValidationService';
import { ICalculatedColumnExpressionService } from '../Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../Services/Interface/IChartService';
import { IPPStyle } from './Reports/IPPStyle';
import { IEvent } from './IEvent';
import { IStrategyCollection } from '../../Strategy/Interface/IStrategy';
import { ILicenceService } from '../Services/Interface/ILicenceService';
import { IScheduleService } from '../Services/Interface/IScheduleService';
import { IAuditLogService } from '../Services/Interface/IAuditLogService';
import { ISearchService } from '../Services/Interface/ISearchService';
import { ColumnSort, VendorGridInfo } from '../../PredefinedConfig/RunTimeState/LayoutState';
import { FreeTextColumn } from '../../PredefinedConfig/RunTimeState/FreeTextColumnState';
import { CalculatedColumn } from '../../PredefinedConfig/RunTimeState/CalculatedColumnState';
import { PercentBar } from '../../PredefinedConfig/RunTimeState/PercentBarState';
import { ActionColumn } from '../../PredefinedConfig/DesignTimeState/ActionColumnState';
import { GridCell } from './SelectedCell/GridCell';

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
  LicenceService: ILicenceService;
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

  //FreeTextColumn
  addFreeTextColumnToGrid(freeTextColumn: FreeTextColumn): void;

  //CalculatedColumn
  addCalculatedColumnToGrid(calculatedColumn: CalculatedColumn): void;
  removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
  editCalculatedColumnInGrid(calculatedColumn: CalculatedColumn): void;

  // actionColumn
  addActionColumnToGrid(actionColumn: ActionColumn): void;

  // percentBar
  removePercentBar(percentBar: PercentBar): void;
  addPercentBar(percentBar: PercentBar): void;
  editPercentBar(percentBar: PercentBar): void;

  // Filtering
  hideFilterForm(): void;
  applyGridFiltering(): void;
  clearGridFiltering(): void;
  clearColumnFiltering(columnIds: string[]): void;

  //TEMPORARY : JO
  getIPPStyle(): IPPStyle;

  // info
  getRowCount(): number;
  getColumnCount(): number;
  getVisibleRowCount(): number;
  getVisibleColumnCount(): number;

  // layout
  getVendorGridState(visibleCols: string[], forceFetch: boolean): VendorGridInfo;
  setVendorGridState(vendorGridState: VendorGridInfo): void;

  // vendor grid related
  isSelectable(): boolean;

  // quick filter
  hasQuickFilter: boolean;
  showQuickFilter(): void;
  hideQuickFilter(): void;

  //Theme
  applyBlotterTheme(themeClassName: string): void;
  applyLightTheme(): void;
  applyDarkTheme(): void;
}
