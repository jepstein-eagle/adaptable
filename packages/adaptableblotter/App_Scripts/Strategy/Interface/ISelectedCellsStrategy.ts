import { IStrategy } from './IStrategy';
import { IColumn } from '../../Utilities/Interface/IColumn';

export interface ISelectedCellsStrategy extends IStrategy {
    CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary
}

export interface ISelectedCell {
    columnId: string,
    value: any
}

export interface ISelectedCellInfo {
    Columns: IColumn[]
    Selection: Map<any, ISelectedCell[]>
}


export interface ISelectedCellSummmary{
    Sum: any, // can be number or blank
    Average: any, // can be number or blank
    Median: any, // can be number or blank
    Distinct: any, // always a number
    Max: any, // can be number or blank
    Min: any, // can be number or blank
    Count: any, // always a number
    Only: any, // can be value or blank
    VWAP: any  // number
   }

   

