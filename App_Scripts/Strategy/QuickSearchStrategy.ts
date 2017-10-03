import { IQuickSearchStrategy } from '../Core/Interface/IQuickSearchStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { MenuType, LeafExpressionOperator, QuickSearchDisplayType, SortOrder } from '../Core/Enums';
import { StringExtensions } from '../Core/Extensions'
import { QuickSearchState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { Helper } from '../Core/Helper'


export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    private quickSearchState: QuickSearchState
    private visibleColumns: string[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Quick Search", 'QuickSearchConfig', MenuType.ConfigurationPopup, "eye-open");
    }

    protected InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();

            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                "ApplyQuickSearch",
                "QuickSearch params has changed",
                this.quickSearchState)

            this.blotter.applyColumnFilters();
        }
    }
    private GetQuickSearchState(): QuickSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
    }
}