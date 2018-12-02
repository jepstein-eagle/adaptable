import { IQuickSearchStrategy } from '../../Strategy/Interface/IQuickSearchStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy';
export declare class QuickSearchagGridStrategy extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter);
    protected postSearch(): void;
}
