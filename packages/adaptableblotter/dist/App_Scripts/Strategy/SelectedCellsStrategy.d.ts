import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISelectedCellsStrategy } from "./Interface/ISelectedCellsStrategy";
import { ISelectedCellInfo } from "../Utilities/Interface/SelectedCell/ISelectedCellInfo";
import { ISelectedCellSummmary } from "../Utilities/Interface/SelectedCell/ISelectedCellSummmary";
export declare class SelectedCellsStrategy extends AdaptableStrategyBase implements ISelectedCellsStrategy {
    private SelectedCellsState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary;
    private sumNumberArray;
    private meanNumberArray;
    private medianNumberArray;
    private calculateVwap;
}
