import { IUserFilterStrategy } from '../Core/Interface/IUserFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as StrategyNames from '../Core/StrategyNames'
import * as StrategyGlyphs from '../Core/StrategyGlyphs'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { UserFilterState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
    private userFilters: UserFilterState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.UserFilterStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyNames.UserFilterStrategyName, ScreenPopups.UserFilterConfigPopup, StrategyGlyphs.UserFilterGlyph);
    }

    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                "Create User Filter",
                ScreenPopups.UserFilterConfigPopup,
                StrategyGlyphs.UserFilterGlyph,
                "New|" + columnId)))
    }


    protected InitState() {
        if (this.userFilters != this.GetFilterState()) {
            setTimeout(() => this.blotter.applyColumnFilters(), 5);
            this.userFilters = this.GetFilterState();
           }
    }

    private GetFilterState(): UserFilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().UserFilter;
    }
}


