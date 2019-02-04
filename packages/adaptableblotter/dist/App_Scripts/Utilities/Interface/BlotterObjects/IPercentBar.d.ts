import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface IPercentBar extends IAdaptableBlotterObject {
    ColumnId: string;
    MinValue?: number;
    MaxValue?: number;
    PositiveColor: string;
    NegativeColor: string;
    ShowValue: boolean;
    MaxValueColumnId?: string;
    MinValueColumnId?: string;
}
