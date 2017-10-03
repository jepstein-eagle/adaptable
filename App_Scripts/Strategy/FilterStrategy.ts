import { IFilterStrategy, IColumnFilter } from '../Core/Interface/IFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { FilterState } from '../Redux/ActionsReducers/Interface/IState';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class FilterStrategy extends AdaptableStrategyBase implements IFilterStrategy {
    private filters: FilterState

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FilterStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("User Filter", 'UserFilterConfig', MenuType.ConfigurationPopup, "filter");
    }

    protected addColumnMenuItems(columnId: string): void {
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
            MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                "Create User Filter",
                "UserFilterConfig",
                MenuType.ConfigurationPopup,
                "filter",
                "New|" + columnId)))
    }


    protected InitState() {
        if (this.filters != this.GetFilterState()){
            setTimeout(() => this.blotter.applyColumnFilters(), 5);
            this.filters = this.GetFilterState();
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                "Apply Column Filters",
                "Refresh Column Filters",
                null)
        }
    }

    private GetFilterState(): FilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter;
    }
}


