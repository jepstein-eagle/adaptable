import { IFilterStrategy, IColumnFilter } from '../Core/Interface/IFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyConstants from '../Core/StrategyConstants'
import * as ScreenPopups from '../Core/ScreenPopups'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { FilterState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class FilterStrategy extends AdaptableStrategyBase implements IFilterStrategy {
    private filters: FilterState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.FilterStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup(StrategyConstants.FilterStrategyFriendlyName, ScreenPopups.UserFilterConfigPopup, StrategyConstants.FilterGlyph);
    }

    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                "Create User Filter",
                ScreenPopups.UserFilterConfigPopup,
                StrategyConstants.FilterGlyph,
                "New|" + columnId)))
    }


    protected InitState() {
        if (this.filters != this.GetFilterState()) {
            setTimeout(() => this.blotter.applyColumnFilters(), 5);
            this.filters = this.GetFilterState();
            this.AuditFunctionAction("Apply Column Filters",
                "Refresh Column Filters",
                null)
        }
    }

    private GetFilterState(): FilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter;
    }
}


