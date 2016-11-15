import { ColumnType } from '../Enums'
import { IMenuItem, IStrategy } from './IStrategy'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'
import { ISearchService } from '../Services/Interface/ISearchService'
import { ExpressionString } from '../../Core/Expression/ExpressionString';



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
    setCustomSort(columnId: string, comparer: Function): void
    getColumnValueString(columnId: string): Array<string>
    removeCustomSort(columnId: string): void
    getCurrentCellEditValue(): any
    getDisplayValue(id: any, columnId: string): string
    gridHasCurrentEditValue(): boolean
    selectCells(cells: { id: any, columnId: string }[]): void
    isColumnReadonly(columnId: string): boolean
    getRecordIsSatisfiedFunction(id: any, type: "getColumnValue" | "getDisplayColumnValue"): (columnName: string) => any

    SetNewColumnListOrder(VisibleColumnList: Array<IColumn>): void
    getActiveCell(): { Id: any, ColumnId: string, Value: any }
    saveAsExcel(fileName: string, allPages: boolean): void
    isGridPageable(): boolean
    printGrid(): void

    // cell styling methods
    addCellStyle(rowIdentifierValue: any, columnStyleMapping: IColumnCellStyleMapping, timeout?: number): void
    addCellStylesForRow(rowIdentifierValue: any, columnStyleMappings: Array<IColumnCellStyleMapping>): void
    removeCellStyle(rowIdentifierValue: any, columnStyleMapping: IColumnCellStyleMapping): void
    removeCellStyles(rowIdentifierValues: any[], columnStyleMappings: Array<IColumnCellStyleMapping>): void

    // get dirty data
    GetDirtyValueForColumnFromDataSource(columnName: string, identifierValue: any): any

    // playing around
    getAllRowIds(): string[]
    applySearch(ExpressionString: ExpressionString, tempString: string): void


    // Grid Events
    onMenuClicked(menuItem: IMenuItem): void
    OnKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>;
    OnGridDataBound(): IEvent<IAdaptableBlotter, IAdaptableBlotter>; // needed to respond to grid databound which gets called every time we do an edit :()
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

export interface IColumnCellStyleMapping {
    ColumnIndex: number
    CellStyle: string
    Expression: ExpressionString
}
