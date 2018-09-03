import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IChartStrategy } from './Interface/IChartStrategy';
export declare class ChartStrategy extends AdaptableStrategyBase implements IChartStrategy {
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
}
