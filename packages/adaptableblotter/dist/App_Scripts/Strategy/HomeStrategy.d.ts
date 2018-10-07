import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IHomeStrategy } from './Interface/IHomeStrategy';
export declare class HomeStrategy extends AdaptableStrategyBase implements IHomeStrategy {
    private GridSorts;
    private GridState;
    constructor(blotter: IAdaptableBlotter);
    protected InitState(): void;
    private GetGridState;
}
