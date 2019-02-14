import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ICellSummaryStrategy } from "./Interface/ICellSummaryStrategy";
import { ISelectedCellInfo } from "../Utilities/Interface/SelectedCell/ISelectedCellInfo";
import { ICellSummmary } from "../Utilities/Interface/SelectedCell/ICellSummmary";
export declare class CellSummaryStrategy extends AdaptableStrategyBase implements ICellSummaryStrategy {
    private CellSummaryState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    CreateCellSummary(selectedCellInfo: ISelectedCellInfo): ICellSummmary;
    private sumNumberArray;
    private meanNumberArray;
    private medianNumberArray;
    private calculateVwap;
}
