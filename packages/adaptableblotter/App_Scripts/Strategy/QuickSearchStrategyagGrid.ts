import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter';
import { QuickSearchStrategy } from './QuickSearchStrategy';

export class QuickSearchStrategyagGrid extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }



    protected postSearch() {
        if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
            //TODO : This is probably temporary and is used to reevaluate the quicksearch CellClassRules
            this.blotter.redraw()
        }
    }
}