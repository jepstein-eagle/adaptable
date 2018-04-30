import { DataType, DistinctCriteriaPairValue, SearchChangedTrigger } from '../Enums'
import { IStrategy } from '../../Strategy/Interface/IStrategy'
import { ICellInfo, IAdaptableStrategyCollection, ISelectedCells } from '../../Core/Interface/Interfaces'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'
import { IValidationService } from '../Services/Interface/IValidationService'
import { IPPStyle } from '../../Strategy/Interface/IExportStrategy'
import { AuditLogService } from '../Services/AuditLogService'
import { ICalculatedColumnExpressionService } from "../Services/Interface/ICalculatedColumnExpressionService";
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { IColumn } from './IColumn';
import { EventDispatcher } from '../EventDispatcher';
import { ICalculatedColumn, IGridSort } from '../Api/Interface/AdaptableBlotterObjects';
import { ISearchChangedEventArgs } from '../Api/Interface/ISearchChangedEventArgs';
import { IBlotterApi } from '../Api/Interface/IBlotterApi';

export interface IAdaptableBlotter {
   /**
    * The main external interface for users of the Blotter (e.g. Devs).  Ideally the methods contained there should be all they ever require...
    */
    api: IBlotterApi

    GridName: string
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection

    // Services
    CalendarService: ICalendarService
    AuditService: IAuditService
    ValidationService: IValidationService
    AuditLogService: AuditLogService
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    InitAuditService(): void

    // Grid Events
    onKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>;
    onSelectedCellsChanged(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onRefresh(): IEvent<IAdaptableBlotter, IAdaptableBlotter>;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; // needed to respond to grid databound which gets called every time we do an edit :()

    // not sure if this is right but putting the event here
    SearchedChanged: EventDispatcher<IAdaptableBlotter, ISearchChangedEventArgs>
   
    // General
    createMenu(): void
    getPrimaryKeyValueFromRecord(record: any): any
    hideFilterForm(): void
    setGridSort(gridSorts: IGridSort[]): void

    // cell selection
    getSelectedCells(): ISelectedCells
    getActiveCell(): ICellInfo
    selectCells(cells: ICellInfo[]): void
    selectColumn(columnId: string): void

    // column related
    getColumnIndex(columnId: string): number
    setColumnIntoStore(): void
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>
    getDisplayValue(id: any, columnId: string): string
    getDisplayValueFromRecord(row: any, columnId: string): string
    isColumnReadonly(columnId: string): boolean
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any
    getRecordIsSatisfiedFunctionFromRecord(record: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnId: string) => any
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void

    // editing related
    setValue(cellInfo: ICellInfo): void
    setValueBatch(batchValues: ICellInfo[]): void
    cancelEdit(): any
    gridHasCurrentEditValue(): boolean
    getCurrentCellEditValue(): any

    // Row Methods
    forAllRecordsDo(func: (record: any) => any): void;
    forAllVisibleRecordsDo(func: (record: any) => any): void;

    // Custom Sort
    setCustomSort(columnId: string, comparer: Function): void
    removeCustomSort(columnId: string): void

    //CalculatedColumn
    addCalculatedColumnToGrid(calculatedColumn: ICalculatedColumn): void
     removeCalculatedColumnFromGrid(calculatedColumnID: string) :void
    getFirstRecord(): any

    // Filtering
    applyGridFiltering(): void

    //TEMPORARY : JO
    getIPPStyle(): IPPStyle

    // info
    getRowInfo(): any
    getColumnInfo(): any

    // temp : JW  -- until we are able to get multi column sort working on hypergrid
    canMultiSort(): boolean
}
