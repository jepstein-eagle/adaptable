import { DistinctCriteriaPairValue } from '../Enums'
import { ICellInfo, IAdaptableStrategyCollection, IVendorGridInfo } from './Interfaces'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IColumn } from './IColumn';
import { EventDispatcher } from '../EventDispatcher';
import { ICalculatedColumn, IGridSort, ILayout, IFreeTextColumn, IPercentBar } from '../../Api/Interface/IAdaptableBlotterObjects';
import { IBlotterApi } from '../../Api/Interface/IBlotterApi';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from '../../Api/Interface/IStateEvents';
import { IAdaptableBlotterOptions } from '../../Api/Interface/IAdaptableBlotterOptions';
import { ICalendarService } from '../../Utilities/Services/Interface/ICalendarService';
import { IAuditService } from '../../Utilities/Services/Interface/IAuditService';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';
import { AuditLogService } from '../../Utilities/Services/AuditLogService';
import { ICalculatedColumnExpressionService } from '../../Utilities/Services/Interface/ICalculatedColumnExpressionService';
import { IChartService } from '../../Utilities/Services/Interface/IChartService';
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy';

export interface IAdaptableBlotter {
    /**
     * The main external interface for users of the Blotter (e.g. Devs).  Ideally the methods contained there should be all they ever require...
     */
    api: IBlotterApi
    BlotterOptions: IAdaptableBlotterOptions

    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection

    VendorGridName: 'agGrid' | 'Hypergrid' ;
    EmbedColumnMenu: boolean
    isInitialised: boolean

    // Services
    CalendarService: ICalendarService
    AuditService: IAuditService
    ValidationService: IValidationService
    AuditLogService: AuditLogService
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    ChartService: IChartService
    InitAuditService(): void

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
    isFilterable(): boolean
    isQuickFilterable(): boolean
    isQuickFilterActive(): boolean
    showQuickFilter(): void
    hideQuickFilter(): void

    //Theme
    applyLightTheme(): void
    applyDarkTheme(): void

    redraw(): void
    
}

