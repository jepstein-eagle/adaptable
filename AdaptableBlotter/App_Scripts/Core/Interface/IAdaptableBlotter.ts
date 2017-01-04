import { ColumnType } from '../Enums'
import { IMenuItem, IStrategy } from './IStrategy'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'
import { ISearchService } from '../Services/Interface/ISearchService'
import { Expression } from '../../Core/Expression/Expression';
import { INamedExpression } from '../../Core/Interface/IExpression';




export interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection

    CalendarService: ICalendarService
    AuditService: IAuditService
    SearchService: ISearchService
    
    getSelectedCells(): ISelectedCells
    getColumnType(columnId: string): ColumnType
    getColumnHeader(columnId: string): string
    getColumnIndex(columnName: string): number
    setValue(id: any, columnId: string, value: any): void
    setValueBatch(batchValues: { id: any, columnId: string, value: any }[]): void
    CreateMenu(): void
    SetColumnIntoStore(): void
    getColumnValueString(columnId: string): Array<string>
    getCurrentCellEditValue(): any
    getDisplayValue(id: any, columnId: string): string
    gridHasCurrentEditValue(): boolean
    selectCells(cells: { id: any, columnId: string }[]): void
    isColumnReadonly(columnId: string): boolean
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any
    SetNewColumnListOrder(VisibleColumnList: Array<IColumn>): void
    getActiveCell(): { Id: any, ColumnId: string, Value: any }
    isGridPageable(): boolean
    getPrimaryKeyValueFromRecord(record: any): any

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
    saveAsExcel(fileName: string, allPages: boolean): void

    // Print Preview
    printGrid(): void


    // Grid Events
    onMenuClicked(menuItem: IMenuItem): void
    OnKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>;
    OnGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; // needed to respond to grid databound which gets called every time we do an edit :()


    // temp test
    applyFilters(): void 
       isFilteredColumn(columnId: string): boolean 
}

export interface ISelectedCells {
    //map of UUID with their associated values/columns
    Selection: Map<any, { columnID: string, value: any }[]>
}

export interface IAdaptableStrategyCollection extends Map<string, IStrategy> {
}

export interface IColumn {
    ColumnId: string,
    ColumnFriendlyName: string
    ColumnType: ColumnType
    Visible: boolean
}  