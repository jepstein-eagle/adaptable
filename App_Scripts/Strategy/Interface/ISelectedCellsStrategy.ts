import { IStrategy } from './IStrategy';
import { DataType } from '../../Core/Enums';
import { IColumn } from '../../Core/Interface/IColumn';

export interface ISelectedCellsStrategy extends IStrategy {
}

export interface ISelectedCell {
    columnId: string,
    value: any
}

export interface ISelectedCellInfo {
    //map of UUID with their associated values/columns
    Columns: IColumn[]
    Selection: Map<any, ISelectedCell[]>
}




