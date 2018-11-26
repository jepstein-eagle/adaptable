import { DistinctCriteriaPairValue } from '../Enums'
import { ICellInfo, IAdaptableStrategyCollection, IVendorGridInfo } from './Interfaces'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'
import { IValidationService } from '../Services/Interface/IValidationService'
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy'
import { AuditLogService } from '../Services/AuditLogService'
import { ICalculatedColumnExpressionService } from "../Services/Interface/ICalculatedColumnExpressionService";
import { IRawValueDisplayValuePair, KeyValuePair } from '../../View/UIInterfaces';
import { IColumn } from './IColumn';
import { EventDispatcher } from '../EventDispatcher';
import { ICalculatedColumn, IGridSort, ILayout, IFreeTextColumn, IPercentCellRenderer } from '../Api/Interface/IAdaptableBlotterObjects';
import { IBlotterApi } from '../Api/Interface/IBlotterApi';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs } from '../Api/Interface/IStateEvents';
import { IAdaptableBlotterOptions } from '../Api/Interface/IAdaptableBlotterOptions';
import { IChartService } from '../Services/Interface/IChartService';

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
    hideFilterForm(): void

    // cell selection
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
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void
    getDisplayValueFromRawValue(colId: string, rawValue: any): any

    // editing related
    setValue(cellInfo: ICellInfo): void
    setValueBatch(batchValues: ICellInfo[]): void
    cancelEdit(): any
    gridHasCurrentEditValue(): boolean
    getCurrentCellEditValue(): any

    // Row Methods
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
   
    // cellRenderer
    removePercentCellRenderer(percentCellRenderer: IPercentCellRenderer): void
    addPercentCellRenderer(percentCellRenderer: IPercentCellRenderer): void
    editPercentCellRenderer(percentCellRenderer: IPercentCellRenderer): void


    getFirstRecord(): any

    // Filtering
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
    
    isInitialised: boolean
}

