import { ColumnType } from '../Enums'
import { IMenuItem, IStrategy } from './IStrategy'
import { IAdaptableBlotterStore } from '../../Redux/Store/Interface/IAdaptableStore'
import { IEvent } from './IEvent'
import { ICalendarService } from '../Services/Interface/ICalendarService'
import { IAuditService } from '../Services/Interface/IAuditService'



export interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection

    CalendarService: ICalendarService
    AuditService: IAuditService

    DataSource: any

    getSelectedCells(): ISelectedCells
    getColumnType(columnId: string): ColumnType
    getColumnHeader(columnId: string): string
    setValue(id: any, columnId: string, value: any): void
    setValueBatch(batchValues: { id: any, columnId: string, value: any }[]): void
    onMenuClicked(menuItem: IMenuItem): void
    CreateMenu(): void
    SetColumnIntoStore(): void
    setCustomSort(columnId: string, comparer: Function): void
    getColumnValueString(columnId: string): Array<string>
    removeCustomSort(columnId: string): void
    getCurrentCellEditValue(): any
    gridHasCurrentEditValue(): boolean
    selectCells(cells: { id: any, columnId: string }[]): void
    isColumnReadonly(columnId: string): boolean

    OnKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>;
    SetNewColumnListOrder(VisibleColumnList: Array<IColumn>): void
    getActiveCell(): { Id: any, ColumnId: string, Value: any }
    saveAsExcel(fileName: string, allPages: boolean): void
    isGridPageable(): boolean

    // cell styling methods
    addCellStyleWithTimeout(rowIdentifierValue: any, columnName: string, styleName: string, timeout: number): void
    addCellStyle(rowIdentifierValue: any, columnName: string, styleName: string): void
    removeCellStyle(rowIdentifierValue: any, columnName: string, styleName: string): void
    // removing this for now and seeing if we need it later...
    //addValueDirectlyToCell(rowIdentifierValue: any, columnName: string, valueToAdd: any): void
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