import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter';
import { QuickSearchStrategy } from './QuickSearchStrategy';
export declare class QuickSearchStrategyagGrid extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter);
    protected postSearch(): void;
}
