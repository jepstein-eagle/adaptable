import { IQuickSearchStrategy } from '../../Core/Interface/IQuickSearchStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { MenuType } from '../../Core/Enums';


export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    private quickSearchText: string

    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("QuickSearch", this.Id, 'QuickSearchAction', MenuType.Action, "search");
        this.quickSearchText = "";
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        let stateQuickSearchText: string = this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText;
        if (this.quickSearchText !=null && this.quickSearchText != stateQuickSearchText) {
            this.quickSearchText = stateQuickSearchText;
            this.blotter.SearchService.ApplyQuickSearch();
        }
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

}