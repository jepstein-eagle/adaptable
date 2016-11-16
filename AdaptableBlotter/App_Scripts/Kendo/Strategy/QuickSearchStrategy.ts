import { IQuickSearchStrategy } from '../../Core/Interface/IQuickSearchStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { MenuType } from '../../Core/Enums';


export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    public QuickSearchText: string

    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("QuickSearch", this.Id, 'QuickSearchAction', MenuType.Action, "search");
        this.QuickSearchText = "";
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        let stateQuickSearchText: string = this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch.QuickSearchText;
        if (this.QuickSearchText !=null && this.QuickSearchText != stateQuickSearchText) {
            this.QuickSearchText = stateQuickSearchText;
            this.blotter.SearchService.ApplySearch(this.QuickSearchText);
        }
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

}