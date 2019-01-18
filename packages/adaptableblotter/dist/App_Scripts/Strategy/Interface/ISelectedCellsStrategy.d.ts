import { IStrategy } from './IStrategy';
import { IColumn } from '../../Utilities/Interface/IColumn';
export interface ISelectedCellsStrategy extends IStrategy {
    CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary;
}
export interface ISelectedCell {
    columnId: string;
    value: any;
}
export interface ISelectedCellInfo {
    Columns: IColumn[];
    Selection: Map<any, ISelectedCell[]>;
}
export interface ISelectedCellSummmary {
    Sum: any;
    Average: any;
    Median: any;
    Distinct: any;
    Max: any;
    Min: any;
    Count: any;
    Only: any;
    VWAP: any;
}
