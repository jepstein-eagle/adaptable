import { DistinctCriteriaPairValue } from '../Enums'
import { ICellInfo } from "./ICellInfo";
import { IVendorGridInfo } from "./IVendorGridInfo";
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IColumn } from './IColumn';
import { EventDispatcher } from '../EventDispatcher';
import { IGridSort } from "./IGridSort";
import { IPercentBar } from "./BlotterObjects/IPercentBar";
import { IFreeTextColumn } from "./BlotterObjects/IFreeTextColumn";
import { ICalculatedColumn } from "./BlotterObjects/ICalculatedColumn";
import { IBlotterApi } from '../../Api/Interface/IBlotterApi';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs, IAlertFiredEventArgs } from './IStateEvents';
import { IAdaptableBlotterOptions } from './BlotterOptions/IAdaptableBlotterOptions';
import { ICalendarService } from '../Services/Interface/ICalendarService';
import { IDataService } from '../Services/Interface/IDataService';
import { IValidationService } from '../Services/Interface/IValidationService';
import { AuditLogService } from '../Services/AuditLogService';
import { ICalculatedColumnExpressionService } from '../Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../Services/Interface/IChartService';
import { IPPStyle } from "./Reports/IPPStyle";
import { IEvent } from './IEvent';
import { IAdaptableStrategyCollection } from '../../Strategy/Interface/IStrategy';
import { ILicenceService } from '../Services/Interface/ILicenceService';
import { IScheduleService } from '../Services/Interface/IScheduleService';
import { ScheduleService } from '../Services/ScheduleService';

/**
 *  The only interface for the AdaptableBlotter  
 *  Contains all the properties and methods that each implemenation must include
 */
export interface IAdaptableBlotter {
   
    api: IBlotterApi
    BlotterOptions: IAdaptableBlotterOptions

    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection

    VendorGridName: 'agGrid' | 'Hypergrid';
    EmbedColumnMenu: boolean
    isInitialised: boolean

    // Services
    CalendarService: ICalendarService
    DataService: IDataService
    ValidationService: IValidationService
    AuditLogService: AuditLogService
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    ChartService: IChartService
    LicenceService: ILicenceService
    ScheduleService: IScheduleService

    // Grid Events
    onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any>;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; 
    onGridReloaded(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; 
    onSearchChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; 
   
    // not sure if this is right but putting the events here
    SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>
    StateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>
    ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>;
    AlertFired: EventDispatcher<IAdaptableBlotter, IAlertFiredEventArgs>;

    // General
    createMenu(): void
    setGridData(dataSource: any): void
    reloadGrid(): void

    // cell / column selection
    getActiveCell(): ICellInfo
    selectColumn(columnId: string): void

    // column related
    setColumnIntoStore(): void
    setNewColumnListOrder(visibleColumnList: Array<IColumn>): void
  
    // getting records and keys
    getPrimaryKeyValueFromRecord(record: any): any
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue, visibleRowsOnly: boolean): Array<IRawValueDisplayValuePair>
    getDisplayValue(id: any, columnId: string): string
    getDisplayValueFromRecord(row: any, columnId: string): string
    getRawValueFromRecord(row: any, columnId: string): any
    getRecordIsSatisfiedFunction(id: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any
    getRecordIsSatisfiedFunctionFromRecord(record: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any
    getDisplayValueFromRawValue(columnId: string, rawValue: any): any
   

    // editing related
    setValue(cellInfo: ICellInfo): void
    setValueBatch(batchValues: ICellInfo[]): void
    cancelEdit(): any
    gridHasCurrentEditValue(): boolean
    getCurrentCellEditValue(): any

    // Row Methods
    getFirstRecord(): any
    forAllRecordsDo(func: (record: any) => any): void;
    forAllVisibleRecordsDo(func: (record: any) => any): void;
    isGroupRecord(record: any): boolean

    //  Sort
    setCustomSort(columnId: string, comparer: Function): void
    removeCustomSort(columnId: string): void
    setGridSort(gridSorts: IGridSort[]): void

    //FreeTextColumn
    addFreeTextColumnToGrid(freeTextColumn: IFreeTextColumn): void

    //CalculatedColumn
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void
    removeCalculatedColumnFromGrid(calculatedColumnID: string): void
    editCalculatedColumnInGrid(calculatedColumn: ICalculatedColumn): void

    // percentBar
    removePercentBar(percentBar: IPercentBar): void
    addPercentBar(percentBar: IPercentBar): void
    editPercentBar(percentBar: IPercentBar): void

    // Filtering
    hideFilterForm(): void
    applyGridFiltering(): void
    clearGridFiltering(): void
    clearColumnFiltering(columnIds: string[]): void

    //TEMPORARY : JO
    getIPPStyle(): IPPStyle

    // info
    getRowCount(): number
    getColumnCount(): number
    getVisibleRowCount(): number
    getVisibleColumnCount(): number

    // layout
    getVendorGridState(visibleCols: string[], forceFetch: boolean): IVendorGridInfo
    setVendorGridState(vendorGridState: IVendorGridInfo): void

    // vendor grid related
    isSelectable(): boolean
 
    // floating filter
    hasFloatingFilter: boolean
    showFloatingFilter(): void
    hideFloatingFilter(): void

    //Theme
    applyLightTheme(): void
    applyDarkTheme(): void

    redraw(): void



}