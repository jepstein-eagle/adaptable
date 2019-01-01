import { ApiBase } from "./ApiBase";
import { IPercentBar } from './Interface/IAdaptableBlotterObjects';
export interface IPercentBarApi {
    GetAll(): IPercentBar[];
    GetByColumn(columnId: string): IPercentBar;
    Add(percentBar: IPercentBar): void;
    Create(columnId: string, minValue: number, maxValue: number, positiveColor: string, negativeColor: string, showValue: boolean): void;
    EditByIndex(index: number, percentBar: IPercentBar): void;
    Edit(percentBar: IPercentBar): void;
    EditMinValue(minValue: number, columnId: string): void;
    EditMaxValue(maxValue: number, columnId: string): void;
    EditPositiveColor(positiveColor: string, columnId: string): void;
    EditNegativeColor(negativeColor: string, columnId: string): void;
    EditShowValue(showValue: boolean, columnId: string): void;
    Delete(columnId: string): void;
}
export declare class PercentBarApi extends ApiBase implements IPercentBarApi {
    GetAll(): IPercentBar[];
    GetByColumn(columnId: string): IPercentBar;
    Add(percentBar: IPercentBar): void;
    Create(columnId: string, minValue: number, maxValue: number, positiveColor: string, negativeColor: string, showValue: boolean): void;
    EditByIndex(index: number, percentBar: IPercentBar): void;
    Edit(percentBar: IPercentBar): void;
    EditMinValue(minValue: number, columnId: string): void;
    EditMaxValue(maxValue: number, columnId: string): void;
    EditPositiveColor(positiveColor: string, columnId: string): void;
    EditNegativeColor(negativeColor: string, columnId: string): void;
    EditShowValue(showValue: boolean, columnId: string): void;
    Delete(columnId: string): void;
}
