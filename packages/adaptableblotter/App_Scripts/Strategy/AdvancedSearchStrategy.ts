import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdvancedSearchState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { SearchChangedTrigger, StateChangedTrigger } from '../Core/Enums';

export class AdvancedSearchStrategy extends AdaptableStrategyBase implements IAdvancedSearchStrategy {
    private AdvancedSearchState: AdvancedSearchState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AdvancedSearchStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.AdvancedSearchStrategyName, ScreenPopups.AdvancedSearchPopup, StrategyIds.AdvancedSearchGlyph);
    }

    protected InitState() {
        if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
            this.AdvancedSearchState = this.GetAdvancedSearchState();

            // this is re-applying grid filtering even if the change to the search state doesnt effect the current advanced search
            //  probably not an issue but might be worth revisiting ...
            this.blotter.applyGridFiltering()

            if (this.blotter.BlotterOptions.serverSearchOption != 'None') {
                this.publishSearchChanged(SearchChangedTrigger.AdvancedSearch)
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.AdvancedSearch, this.AdvancedSearchState)
            }
        }
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }


}