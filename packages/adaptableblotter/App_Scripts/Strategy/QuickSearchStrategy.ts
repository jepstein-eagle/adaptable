import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { QuickSearchState } from '../Redux/ActionsReducers/Interface/IState'
import { SearchChangedTrigger } from '../Core/Enums';

export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    protected quickSearchState: QuickSearchState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.QuickSearchStrategyName, ScreenPopups.QuickSearchPopup, StrategyIds.QuickSearchGlyph);
    }

    protected InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();

            this.blotter.applyGridFiltering();
            this.postSearch();

            if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishServerSearch(SearchChangedTrigger.QuickSearch)
            }

        }
    }
    protected GetQuickSearchState(): QuickSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
    }

    protected postSearch() {
        // required only for ag-Grid to inherit - a better way possible?
    }
}