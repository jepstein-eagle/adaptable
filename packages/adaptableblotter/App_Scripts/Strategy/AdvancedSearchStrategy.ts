import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { AdvancedSearchState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { SearchChangedTrigger, StateChangedTrigger } from '../Utilities/Enums';

export class AdvancedSearchStrategy extends AdaptableStrategyBase implements IAdvancedSearchStrategy {

    private AdvancedSearchState: AdvancedSearchState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.AdvancedSearchStrategyId, blotter)
        this.blotter.onGridReloaded().Subscribe((sender, blotter) => this.handleGridReloaded())

    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.AdvancedSearchStrategyName, ScreenPopups.AdvancedSearchPopup, StrategyConstants.AdvancedSearchGlyph);
    }

    protected InitState() {
        if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
            this.AdvancedSearchState = this.GetAdvancedSearchState();

            // this is re-applying grid filtering even if the change to the search state doesnt effect the current advanced search
            //  probably not an issue but might be worth revisiting ...
            this.blotter.applyGridFiltering()

            if (this.blotter.BlotterOptions.generalOptions.serverSearchOption != 'None') {
                this.publishSearchChanged(SearchChangedTrigger.AdvancedSearch)
            }

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.AdvancedSearch, this.AdvancedSearchState)
            }
        }
    }

    private handleGridReloaded(): void {
        this.blotter.applyGridFiltering();
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }


}