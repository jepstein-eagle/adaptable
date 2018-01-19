import { ILayoutStrategy, ILayout } from '../Core/Interface/ILayoutStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyConstants from '../Core/StrategyConstants'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as LayoutRedux from '../Redux/ActionsReducers/LayoutRedux'
import * as ColumnChooserRedux from '../Redux/ActionsReducers/ColumnChooserRedux'
import { StringExtensions } from '../Core/Extensions'

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
    public CurrentLayout: string

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.LayoutStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Layout", 'LayoutConfig', "th");
    }
 

}