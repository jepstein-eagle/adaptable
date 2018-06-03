import { IStrategy } from './IStrategy';
import { DataType } from '../../Core/Enums';
import { IColumn } from '../../Core/Interface/IColumn';

export interface ISelectedCellsStrategy extends IStrategy {
    CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary
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


export interface ISelectedCellSummmary{
    Sum: any, // can be number or N/A
    Average: any, // can be number or N/A
    Mode: any, // any value
    Median: any, // can be number or N/A
    Distinct: any, // always a number
    Max: any, // can be number or N/A
    Min: any, // can be number or N/A
    Count: any, // always a number
   }

   

