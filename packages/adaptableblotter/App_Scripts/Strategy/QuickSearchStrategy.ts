import { IQuickSearchStrategy } from './Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Core/Constants/StrategyConstants'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { QuickSearchState } from '../Redux/ActionsReducers/Interface/IState'
import { SearchChangedTrigger, StateChangedTrigger } from '../Utilities/Enums';

export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    protected quickSearchState: QuickSearchState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.QuickSearchStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.QuickSearchStrategyName, ScreenPopups.QuickSearchPopup, StrategyConstants.QuickSearchGlyph);
    }

    protected InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();

            this.blotter.applyGridFiltering();
            this.postSearch();

            if (this.blotter.BlotterOptions.serverSearchOption == 'AllSearch' || 'AllSearchandSort') {
                this.publishSearchChanged(SearchChangedTrigger.QuickSearch)
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.QuickSearch, this.quickSearchState)
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