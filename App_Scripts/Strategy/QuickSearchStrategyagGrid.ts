import { IQuickSearchStrategy } from '../Strategy/Interface/IQuickSearchStrategy';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter';
import { QuickSearchStrategy } from './QuickSearchStrategy';

export class QuickSearchStrategyagGrid extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }



    protected postSearch() {
        let theBlotter = this.blotter as AdaptableBlotter
        if (this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.BlotterOptions.serverSearchOption == 'AllSearch' ||  'AllSearchandSort') {
            //TODO : This is probably temporary and is used to reevaluate the quicksearch CellClassRules
            theBlotter.redrawRows()
        }
    }
}