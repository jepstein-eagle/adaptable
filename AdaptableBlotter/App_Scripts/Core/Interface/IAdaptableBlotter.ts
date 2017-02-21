import { ColumnType, LeafExpressionOperator, QuickSearchDisplayType, DistinctCriteriaPairValue } from '../Enums'
import { IMenuItem, IStrategy, ICellInfo } from './IStrategy'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'
import { ISearchService } from '../Services/Interface/ISearchService'
import { AuditLogService } from '../Services/AuditLogService'
import { Expression } from '../../Core/Expression/Expression';


export interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection

    CalendarService: ICalendarService
    AuditService: IAuditService
    SearchService: ISearchService
    AuditLogService: AuditLogService
    UserName: string

    getSelectedCells(): ISelectedCells
    getColumnType(columnId: string): ColumnType
    getColumnHeader(columnId: string): string
    getColumnIndex(columnName: string): number
    setValue(cellInfo: ICellInfo): void
    setValueBatch(batchValues: ICellInfo[]): void
    CreateMenu(): void
    SetColumnIntoStore(): void
    getColumnValueDisplayValuePairDistinctList(columnId: string, distinctCriteria: DistinctCriteriaPairValue): Array<IRawValueDisplayValuePair>
    getCurrentCellEditValue(): any
    getDisplayValue(id: any, columnId: string): string
    gridHasCurrentEditValue(): boolean
    selectCells(cells: ICellInfo[]): void
    isColumnReadonly(columnId: string): boolean
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any
    SetNewColumnListOrder(VisibleColumnList: Array<IColumn>): void
    getActiveCell(): ICellInfo
    isGridPageable(): boolean
    getPrimaryKeyValueFromRecord(record: any): any
    cancelEdit() : any

    // cell styling methods
    addCellStyle(rowIdentifierValue: any, columnIndex: number, style: string, timeout?: number): void
    removeCellStyle(rowIdentifierValue: any, columnIndex: number, style: string): void
    addRowStyle(rowIdentifierValue: any, style: string, timeout?: number): void
    removeRowStyle(rowIdentifierValue: any, style: string): void
    removeAllRowStylesWithRegex(regex: RegExp): void
    removeAllCellStylesWithRegex(regex: RegExp): void

    // get dirty data
    GetDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any

    // playing around
    getAllRowIds(): string[]
    hideRows(rowIds: string[]): void
    showRows(rowIds: string[]): void

    // Custom Sort
    setCustomSort(columnId: string, comparer: Function): void
    removeCustomSort(columnId: string): void

    // Export
    exportBlotter(): void

    // Print Preview
    printGrid(): void

    // filtering
    applyColumnFilters(): void

    // Grid Events
    onMenuClicked(menuItem: IMenuItem): void
    OnKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>;
    OnGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; // needed to respond to grid databound which gets called every time we do an edit :()

    getQuickSearchRowIds(rowIds: string[]): string[]

createDefaultLayout(): void
    loadCurrentLayout():void
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
    ColumnType: ColumnType
    Visible: boolean,
    Index :number
}

//make sure property names match DistinctCriteriaPairValue
export interface IRawValueDisplayValuePair {
    RawValue: any,
    DisplayValue: string
}
