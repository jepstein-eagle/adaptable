import { DistinctCriteriaPairValue } from '../Enums'
import { ICellInfo } from "./ICellInfo";
import { IVendorGridInfo } from "./IVendorGridInfo";
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IColumn } from './IColumn';
import { EventDispatcher } from '../EventDispatcher';
import { IGridSort } from "./IGridSort";
import { ILayout } from "./BlotterObjects/ILayout";
import { IPercentBar } from "./BlotterObjects/IPercentBar";
import { IFreeTextColumn } from "./BlotterObjects/IFreeTextColumn";
import { ICalculatedColumn } from "./BlotterObjects/ICalculatedColumn";
import { IBlotterApi } from '../../Api/Interface/IBlotterApi';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from './IStateEvents';
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
import { AdaptableBlotterStore } from '../../Redux/Store/AdaptableBlotterStore';

export interface IAdaptableBlotter {
    /**
     * The main external interface for users of the Blotter (e.g. Devs).  Ideally the methods contained there should be all they ever require...
     */
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

    // Grid Events
    onKeyDown(): IEvent<IAdaptableBlotter, KeyboardEvent | any>;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; // needed to respond to grid databound which gets called every time we do an edit :()

    // not sure if this is right but putting the event here
    SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>
    StateChanged: EventDispatcher<IAdaptableBlotter, IStateChangedEventArgs>
    ColumnStateChanged: EventDispatcher<IAdaptableBlotter, IColumnStateChangedEventArgs>

    // General
    createMenu(): void
    getPrimaryKeyValueFromRecord(record: any): any

    // cell / column selection
    getActiveCell(): ICellInfo
    selectColumn(columnId: string): void

    // column related
    getColumnIndex(columnId: string): number
    setColumnIntoStore(): void
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>
    getDisplayValue(id: any, columnId: string): string
    getDisplayValueFromRecord(row: any, columnId: string): string
    getRawValueFromRecord(row: any, columnId: string): any
    getRecordIsSatisfiedFunction(id: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any
    getRecordIsSatisfiedFunctionFromRecord(record: any, distinctCriteria: DistinctCriteriaPairValue): (columnId: string) => any
    setNewColumnListOrder(visibleColumnList: Array<IColumn>): void
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
    isSortable(): boolean
    hasFloatingFilter(): boolean
    isFloatingFilterActive(): boolean
    showFloatingFilter(): void
    hideFloatingFilter(): void

    //Theme
    applyLightTheme(): void
    applyDarkTheme(): void

    redraw(): void

     setGridData(dataSource: any) : void

}