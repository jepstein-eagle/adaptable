import { DataType, LeafExpressionOperator, QuickSearchDisplayType, DistinctCriteriaPairValue } from '../Enums'
import { IMenuItem, IStrategy, ICellInfo } from './IStrategy'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'
import { ICalculatedColumn } from '../Interface/ICalculatedColumnStrategy'
import { AuditLogService } from '../Services/AuditLogService'
import { Expression } from '../../Core/Expression/Expression';
import { ICalculatedColumnExpressionService } from "../Services/Interface/ICalculatedColumnExpressionService";

export interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    BlotterOptions: IAdaptableBlotterOptions
    Strategies: IAdaptableStrategyCollection

    // Services
    CalendarService: ICalendarService
    AuditService: IAuditService
    AuditLogService: AuditLogService
    CalculatedColumnExpressionService: ICalculatedColumnExpressionService
    InitAuditService(): void

    // Grid Events
    onKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>;
    onGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; // needed to respond to grid databound which gets called every time we do an edit :()

    // General
    createMenu(): void
    isGridPageable(): boolean
    getPrimaryKeyValueFromRecord(record: any): any
    hideFilterForm(): void

    // cell selection
    getSelectedCells(): ISelectedCells
    getActiveCell(): ICellInfo
    selectCells(cells: ICellInfo[]): void


    // column related
    getColumnHeader(columnId: string): string
    getColumnIndex(columnName: string): number
    setColumnIntoStore(): void
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>
    getDisplayValue(id: any, columnId: string): string
    getDisplayValueFromRecord(row: any, columnId: string): string
    isColumnReadonly(columnId: string): boolean
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any
    getRecordIsSatisfiedFunctionFromRecord(record: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any
    setNewColumnListOrder(VisibleColumnList: Array<IColumn>): void

    // editing related
    setValue(cellInfo: ICellInfo): void
    setValueBatch(batchValues: ICellInfo[]): void
    cancelEdit(): any
    gridHasCurrentEditValue(): boolean
    getCurrentCellEditValue(): any


    // cell styling methods
    addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void
    removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void
    addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void
    removeRowStyle(rowIdentifierValue: any, style: string): void
    removeAllRowStylesWithRegex(regex: RegExp): void
    removeAllCellStylesWithRegex(regex: RegExp): void

    // get dirty data
    getDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any

    // Row Methods
    getAllRowIds(): string[]
    getAllRows():any[]
    getAllVisibleRows():any[]
    hideRows(rowIds: string[]): void
    showRows(rowIds: string[]): void
   
    // Custom Sort
    setCustomSort(columnId: string, comparer: Function): void
    removeCustomSort(columnId: string): void

    //CalculatedColumn
    deleteCalculatedColumn(calculatedColumnId: string): void
    createCalculatedColumn(calculatedColumn: ICalculatedColumn): void
    getFirstRecord(): any

    // Filtering
    applyColumnFilters(): void
}

export interface ISelectedCells {
    //map of UUID with their associated values/columns
    Selection: Map<any, { columnID: string, value: any }[]>
}

export interface IAdaptableStrategyCollection extends Map<string, IStrategy> {
}

export interface IColumn {
    ColumnId: string,
    FriendlyName: string
    DataType: DataType
    Visible: boolean,
    Index: number
}

//make sure property names match DistinctCriteriaPairValue
export interface IRawValueDisplayValuePair {
    RawValue: any,
    DisplayValue: string
}

export interface IAdaptableBlotterOptions {
    enableAuditLog?: boolean,
    enableRemoteConfigServer?: boolean,
    userName?: string,
    primaryKey?: string,
    blotterId?: string,
    predefinedConfigUrl?: string,
    maxColumnValueItemsDisplayed: number
}

export interface IConfigEntity {
    IsPredefined: boolean
}

export interface IEntitlement {
    FunctionName: string;
    AccessLevel: "ReadOnly" | "Hidden" | "Default";
}