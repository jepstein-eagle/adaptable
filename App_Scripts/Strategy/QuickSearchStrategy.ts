import { IQuickSearchStrategy } from '../Strategy/Interface/IQuickSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { QuickSearchState } from '../Redux/ActionsReducers/Interface/IState'
import { SearchChangedTrigger, ServerSearchOptions } from '../Core/Enums';

export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    protected quickSearchState: QuickSearchState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.QuickSearchStrategyName, ScreenPopups.QuickSearchPopup, StrategyGlyphs.QuickSearchGlyph);
    }

    protected InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();

            this.blotter.applyGridFiltering();
            this.postSearch();

            if (this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.BlotterOptions.serverSearch == ServerSearchOptions.AllSearch||ServerSearchOptions.AllSearchandSort) {
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