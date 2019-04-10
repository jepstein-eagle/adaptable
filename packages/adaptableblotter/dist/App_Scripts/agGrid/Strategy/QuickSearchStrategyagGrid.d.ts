import { IQuickSearchStrategy } from '../../Strategy/Interface/IQuickSearchStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy';
export declare class QuickSearchStrategyagGrid extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter);
    protected afterStateChanged(): void;
}
