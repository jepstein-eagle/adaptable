import {ColumnType} from '../Enums'
import {IAdaptableBlotterStore} from '../../Redux/Store/Interface/IAdaptableStore'

export interface IAdaptableBlotter {
    AdaptableBlotterStore: IAdaptableBlotterStore;
    Strategies: IAdaptableStrategyCollection
    getSelectedCells(): ISelectedCells
    getColumnType(columnId: string): ColumnType
    getColumnHeader(columnId: string): string
     setValue(id: any, columnId:string, value: any) : void
}

export interface ISelectedCells {
    //map of UUID with their associated values/columns
    Selection: Map<any, { columnID: string, value: any }[]>
}

export interface IAdaptableStrategyCollection extends Map<string, IStragegy> {

}