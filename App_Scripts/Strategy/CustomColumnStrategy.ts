import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { ICustomColumn } from "../Core/Interface/ICustomColumnStrategy";

export class CustomColumnStrategy extends AdaptableStrategyBase {
    private CustomColumns: ICustomColumn[]
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CustomColumnStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Custom Column", 'CustomColumnConfig', MenuType.ConfigurationPopup, "th");
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        if (this.CustomColumns != this.blotter.AdaptableBlotterStore.TheStore.getState().CustomColumn.CustomColumns) {
            //All the logic is managed in the redux store middleware
            this.CustomColumns = this.blotter.AdaptableBlotterStore.TheStore.getState().CustomColumn.CustomColumns;
        }
    }
}