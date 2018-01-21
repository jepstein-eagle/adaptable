import { IAdvancedSearchStrategy, IAdvancedSearch } from '../Core/Interface/IAdvancedSearchStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import {  LeafExpressionOperator } from '../Core/Enums';
import { ExpressionHelper, } from '../Core/Expression/ExpressionHelper';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState'
import { Helper } from '../Core/Helper';
import { StringExtensions } from '../Core/Extensions'


export class AdvancedSearchStrategy extends AdaptableStrategyBase implements IAdvancedSearchStrategy {
    private AdvancedSearchState: AdvancedSearchState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AdvancedSearchStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.AdvancedSearchStrategyName, ScreenPopups.AdvancedSearchActionPopup, StrategyGlyphs.AdvancedSearchGlyph);
    }

    protected InitState() {
        if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
            this.AdvancedSearchState = this.GetAdvancedSearchState();

           this.AuditFunctionAction(
                "ApplySearch",
                StringExtensions.IsNullOrEmpty(this.GetAdvancedSearchState().CurrentAdvancedSearchId) ?
                    "No current Advanced Search" : "Current search Id:" + this.GetAdvancedSearchState().CurrentAdvancedSearchId,
                this.AdvancedSearchState.AdvancedSearches.find(x => x.Uid == this.GetAdvancedSearchState().CurrentAdvancedSearchId))

            this.blotter.applyColumnFilters()
        }
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }



}