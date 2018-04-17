import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
 import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Core/Extensions/StringExtensions'


export class AdvancedSearchStrategy extends AdaptableStrategyBase implements IAdvancedSearchStrategy {
    private AdvancedSearchState: AdvancedSearchState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AdvancedSearchStrategyId, blotter)
        }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.AdvancedSearchStrategyName, ScreenPopups.AdvancedSearchPopup, StrategyGlyphs.AdvancedSearchGlyph);
    }

    protected InitState() {
        if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
            this.AdvancedSearchState = this.GetAdvancedSearchState();

            
           this.AuditFunctionAction(
                "ApplySearch",
                StringExtensions.IsNullOrEmpty(this.GetAdvancedSearchState().CurrentAdvancedSearch) ?
                    "No current Advanced Search" : "Current search Id:" + this.GetAdvancedSearchState().CurrentAdvancedSearch,
                this.AdvancedSearchState.AdvancedSearches.find(x => x.Name == this.GetAdvancedSearchState().CurrentAdvancedSearch))

            this.blotter.applyColumnFilters()
        }
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }



}