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
    private userFilters: IUserFilter[]
    private ColumnFilters: IColumnFilter[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FilterStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("User Filter", 'UserFilterConfig', MenuType.ConfigurationPopup, "filter");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
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


    InitState() {
        if (this.userFilters != this.GetFilterState().UserFilters) {

            // call search service as search might need to re-run if its using a filter that has changed / been deleted
            // tell the search service that a filter has changed and it will decide if it needs to run search
            // get filter ids in old collection that are not in new one (as we dont care about new user filter expressions)
            if (this.userFilters != null && this.userFilters.length > 0) {

                let oldFilterUids: string[] = this.userFilters.filter(f => !f.IsPredefined).map(f => f.Uid);
                this.blotter.SearchService.ApplySearchOnUserFilter(oldFilterUids);

                this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                    "Apply Column Filters",
                    "Refresh Column Filters",
                    null)
                // also rerun column filter - but do it every time that user filters are changed - which wont be often
                this.blotter.applyColumnFilters();
            }
            this.userFilters = this.GetFilterState().UserFilters;
        }

        if (this.ColumnFilters != this.GetFilterState().ColumnFilters) {
            setTimeout(() => this.blotter.applyColumnFilters(), 5);
            this.ColumnFilters = this.GetFilterState().ColumnFilters;
        }
    }


    private GetFilterState(): FilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter;
    }
}


