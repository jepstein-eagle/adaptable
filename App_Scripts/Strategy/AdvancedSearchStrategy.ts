import { IAdvancedSearchStrategy } from './Interface/IAdvancedSearchStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AdvancedSearchState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { StringExtensions } from '../Core/Extensions/StringExtensions'
import { basename } from 'path';
import { Server } from 'https';
import { SearchChangedTrigger } from '../Core/Enums';

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

            // this is re-applying grid filtering even if the change to the search state doesnt effect the current advanced search
            //  probably not an issue but might be worth revisiting ...
                this.blotter.applyGridFiltering()

                if (this.blotter.BlotterOptions.serverSearchOption != 'None') {
                     this.publishServerSearch(SearchChangedTrigger.AdvancedSearch)
                }
          
        }
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }
    private GetGridState(): GridState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid;
    }

}