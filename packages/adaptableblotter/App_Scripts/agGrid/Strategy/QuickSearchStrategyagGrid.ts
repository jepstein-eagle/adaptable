import { IQuickSearchStrategy } from '../../Strategy/Interface/IQuickSearchStrategy';
import { AdaptableBlotter } from '../AdaptableBlotter';
import { QuickSearchStrategy } from '../../Strategy/QuickSearchStrategy';

export class QuickSearchStrategyagGrid extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    protected postSearch() {
        if (this.blotter.BlotterOptions.generalOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
            //TODO : This is probably temporary and is used to reevaluate the quicksearch CellClassRules
            this.blotter.redraw()
        }
    }
}