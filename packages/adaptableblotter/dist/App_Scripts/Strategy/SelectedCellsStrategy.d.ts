import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ISelectedCellsStrategy, ISelectedCellInfo, ISelectedCellSummmary } from "./Interface/ISelectedCellsStrategy";
export declare class SelectedCellsStrategy extends AdaptableStrategyBase implements ISelectedCellsStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary;
    private sumNumberArray;
    private meanNumberArray;
    private medianNumberArray;
    private roundNumberToFourPlaces;
    private calculateVwap;
}
