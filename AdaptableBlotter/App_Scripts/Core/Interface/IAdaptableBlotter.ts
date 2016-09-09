import {ColumnType} from '../Enums'
import {IMenuItem, IStragegy} from './IStrategy'
import {IAdaptableBlotterStore} from '../../Redux/Store/Interface/IAdaptableStore'
import {IEvent} from './IEvent'

export interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection
    getSelectedCells(): ISelectedCells
    getColumnType(columnId: string): ColumnType
    getColumnHeader(columnId: string): string
    setValue(id: any, columnId: string, value: any): void
    onMenuClicked(menuItem: IMenuItem): void
    CreateMenu(): void
    SetColumnIntoStore(): void
    setCustomSort(columnId: string, comparer: Function ) : void
    getColumnValueString(columnId: string) : Array<string>
    removeCustomSort(columnId: string): void
    getCurrentCellEditValue(): any
    
    OnKeyDown(): IEvent<IAdaptableBlotter, JQueryKeyEventObject | KeyboardEvent>;
}

export interface ISelectedCells {
    //map of UUID with their associated values/columns
    Selection: Map<any, { columnID: string, value: any }[]>
}

export interface IAdaptableStrategyCollection extends Map<string, IStragegy> {

}

export interface IColumn{
    ColumnId: string,
    ColumnFriendlyName : string
    ColumnType : ColumnType
}