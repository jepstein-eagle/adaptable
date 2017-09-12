import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { ICalculatedColumn } from "../Core/Interface/ICalculatedColumnStrategy";

export class CalculatedColumnStrategy extends AdaptableStrategyBase {
    private CalculatedColumns: ICalculatedColumn[]
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.CalculatedColumnStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Calculated Column", 'CalculatedColumnConfig', MenuType.ConfigurationPopup, "th-list");
    }

    protected InitState() {
        if (this.CalculatedColumns != this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns) {
            //All the logic is managed in the redux store middleware
            this.CalculatedColumns = this.blotter.AdaptableBlotterStore.TheStore.getState().CalculatedColumn.CalculatedColumns;
        }
    }
}