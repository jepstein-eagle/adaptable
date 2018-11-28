import { IQuickSearchStrategy } from '../../App_Scripts/Strategy/Interface/IQuickSearchStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { QuickSearchStrategy } from '../../App_Scripts/Strategy/QuickSearchStrategy';
export declare class QuickSearchagGridStrategy extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter);
    protected postSearch(): void;
}
