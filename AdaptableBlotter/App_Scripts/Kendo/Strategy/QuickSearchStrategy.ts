import { IQuickSearchStrategy } from '../../Core/Interface/IQuickSearchStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { MenuType, SearchStringOperator } from '../../Core/Enums';


export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    private quickSearchText: string
    private searchStringOperator: SearchStringOperator

    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("QuickSearch", this.Id, 'QuickSearchAction', MenuType.Action, "search");
        this.quickSearchText = "";
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
       // Run search if the quick search has changed
        let stateQuickSearchText: string = this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText;
        if (this.quickSearchText !=null && this.quickSearchText != stateQuickSearchText) {
            this.quickSearchText = stateQuickSearchText;
            this.blotter.SearchService.ApplyQuickSearch();
        }
        
        // Run search if the operator has changed and search is not empty
        let stateQuickSearchStringOperator: SearchStringOperator = this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.SearchStringOperator;
             if (this.searchStringOperator !=null && this.searchStringOperator != stateQuickSearchStringOperator && stateQuickSearchText!="") {
            this.searchStringOperator = stateQuickSearchStringOperator;
            this.blotter.SearchService.ApplyQuickSearch();
        }
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

}