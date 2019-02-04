import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
export declare class AdvancedSearchStrategy extends AdaptableStrategyBase implements IAdvancedSearchStrategy {
    private AdvancedSearchState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    private GetAdvancedSearchState;
}
