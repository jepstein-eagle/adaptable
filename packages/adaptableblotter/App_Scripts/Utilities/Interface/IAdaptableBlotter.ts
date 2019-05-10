import { DistinctCriteriaPairValue } from '../Enums';
import { ICellInfo } from './ICellInfo';
import { IVendorGridInfo } from './IVendorGridInfo';
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IColumn } from './IColumn';
import { IGridSort } from './IGridSort';
import { IPercentBar } from './BlotterObjects/IPercentBar';
import { IFreeTextColumn } from './BlotterObjects/IFreeTextColumn';
import { ICalculatedColumn } from './BlotterObjects/ICalculatedColumn';
import { IBlotterApi } from '../../Api/Interface/IBlotterApi';
import { IAdaptableBlotterOptions } from './BlotterOptions/IAdaptableBlotterOptions';
import { ICalendarService } from '../Services/Interface/ICalendarService';
import { IDataService } from '../Services/Interface/IDataService';
import { IValidationService } from '../Services/Interface/IValidationService';
import { AuditLogService } from '../Services/AuditLogService';
import { ICalculatedColumnExpressionService } from '../Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../Services/Interface/IChartService';
import { IPPStyle } from './Reports/IPPStyle';
import { IEvent } from './IEvent';
import { IStrategyCollection } from '../../Strategy/Interface/IStrategy';
import { ILicenceService } from '../Services/Interface/ILicenceService';
import { IScheduleService } from '../Services/Interface/IScheduleService';

/**
 *  The only interface for the AdaptableBlotter
 *  Contains all the properties and methods that each implemenation must include
 *  Each implemenation has a constructor that contains an IAdaptableBlotterOptions object.
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
   * Each implementation of the Adaptable Blotter has a constructor that contains an IAdaptableBlotterOptions object.
   * This object contains a number of properties including 'vedorGrid' which is the underlying grid that they use and the way that we can access the underlying grid and its data
   */
  blotterOptions: IAdaptableBlotterOptions;

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
  AuditLogService: AuditLogService;
  CalculatedColumnExpressionService: ICalculatedColumnExpressionService;
  ChartService: IChartService;
  LicenceService: ILicenceService;
  ScheduleService: IScheduleService;

  /**
   * These are INTERNAL events which the blotter raises and other strategies listen to
   * e.g. the key down event is used by the Shortcut and Plus Minus strategies
   * NOTE:  There are some EXTERNAL events that the Blotter fires which are useful to users - these are all in the IEventAPI class
   */
  onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any>;
  onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
  onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
  onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
  onGridReloaded(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
  onSearchChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;

  // General
  createMenu(): void;
  setGridData(dataSource: any): void;
  reloadGrid(): void;
  redraw(): void;

  // cell / column selection
  getActiveCell(): ICellInfo;
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

  // editing related
  setValue(cellInfo: ICellInfo): void;
  setValueBatch(batchValues: ICellInfo[]): void;
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
  setGridSort(gridSorts: IGridSort[]): void;

  //FreeTextColumn
  addFreeTextColumnToGrid(freeTextColumn: IFreeTextColumn): void;

  //CalculatedColumn
  addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void;
  removeCalculatedColumnFromGrid(calculatedColumnID: string): void;
  editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void;

  // percentBar
  removePercentBar(percentBar: IPercentBar): void;
  addPercentBar(percentBar: IPercentBar): void;
  editPercentBar(percentBar: IPercentBar): void;

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
  getVendorGridState(visibleCols: string[], forceFetch: boolean): IVendorGridInfo;
  setVendorGridState(vendorGridState: IVendorGridInfo): void;

  // vendor grid related
  isSelectable(): boolean;

  // floating filter
  hasFloatingFilter: boolean;
  showFloatingFilter(): void;
  hideFloatingFilter(): void;

  //Theme
  applyLightTheme(): void;
  applyDarkTheme(): void;
}
