import { ILayoutStrategy, ILayout } from '../Core/Interface/ILayoutStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { MenuType } from '../Core/Enums';


export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    public CurrentLayout: string

    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.LayoutStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Layouts", this.Id, 'LayoutConfig', MenuType.Configuration, "th");
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        if (this.CurrentLayout != this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout) {
            this.CurrentLayout = this.blotter.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout;
            this.blotter.loadCurrentLayout();
            // and run search too - is this the responsibility of this strategy to do this? or for search to listen to layouts?
             this.blotter.SearchService.ApplySearchOnGrid();
        }
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

}