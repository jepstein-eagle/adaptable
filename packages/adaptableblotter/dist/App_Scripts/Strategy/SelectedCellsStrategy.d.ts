import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Api/Interface/IAdaptableBlotter';
import { ISelectedCellsStrategy, ISelectedCellInfo, ISelectedCellSummmary } from "./Interface/ISelectedCellsStrategy";
export declare class SelectedCellsStrategy extends AdaptableStrategyBase implements ISelectedCellsStrategy {
    private SelectedCellsState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary;
    private sumNumberArray;
    private meanNumberArray;
    private medianNumberArray;
    private roundNumberToFourPlaces;
    private calculateVwap;
}
