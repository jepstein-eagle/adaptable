import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { QuickSearchState } from '../Redux/ActionsReducers/Interface/IState';
export declare class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    protected quickSearchState: QuickSearchState;
    constructor(blotter: IAdaptableBlotter);
    protected addPopupMenuItem(): void;
    protected InitState(): void;
    protected GetQuickSearchState(): QuickSearchState;
    protected postSearch(): void;
}
