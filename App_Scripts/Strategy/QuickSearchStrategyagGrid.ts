import { IQuickSearchStrategy } from '../Core/Interface/IQuickSearchStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { AdaptableBlotter } from '../Vendors/agGrid/AdaptableBlotter';
import { MenuType, LeafExpressionOperator, QuickSearchDisplayType, SortOrder } from '../Core/Enums';
import { StringExtensions } from '../Core/Extensions'
import { QuickSearchState, GridState } from '../Redux/ActionsReducers/Interface/IState'
import { Helper } from '../Core/Helper'
import { QuickSearchStrategy } from './QuickSearchStrategy';


export class QuickSearchStrategyagGrid extends QuickSearchStrategy implements IQuickSearchStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
    }

    protected InitState() {
        if (this.quickSearchState != this.GetQuickSearchState()) {
            this.quickSearchState = this.GetQuickSearchState();

            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                "ApplyQuickSearch",
                "QuickSearch params has changed",
                this.quickSearchState)

            this.blotter.applyColumnFilters();
            let theBlotter = this.blotter as AdaptableBlotter
            //TODO : This is probably temporary and is used to reevaluate the quicksearch CellClassRules
            theBlotter.redrawRows()
        }
    }
}