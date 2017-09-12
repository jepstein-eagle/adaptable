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
    private quickSearchText: string
    private quickSearchOperator: LeafExpressionOperator
    private quickSearchDisplayType: QuickSearchDisplayType
    private visibleColumns: string[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Quick Search", 'QuickSearchConfig', MenuType.ConfigurationPopup, "eye-open");
        this.quickSearchText = "";
        this.quickSearchOperator = this.GetQuickSearchState().QuickSearchOperator
        this.quickSearchDisplayType = this.GetQuickSearchState().QuickSearchDisplayType
        this.visibleColumns = this.getVisibleColumnIds() // does this return anything
    }

    protected InitState() {
        // Run quick search if the quick search text has changed
        let stateQuickSearchText: string = this.GetQuickSearchState().QuickSearchText;
        if (StringExtensions.IsNotNull(this.quickSearchText) && this.quickSearchText != stateQuickSearchText) {
            this.quickSearchText = stateQuickSearchText;

            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                "ApplyQuickSearch",
                "QuickSearch Text has changed",
                this.quickSearchText)

            this.blotter.SearchService.ApplySearchOnGrid();
        }

        // Other checks to see if quick search should be run - only if quick search is not empty
        if (StringExtensions.IsNotNullOrEmpty(this.quickSearchText)) {

            // Run quick search if the operator has changed 
            let stateQuickSearchOperator: LeafExpressionOperator = this.GetQuickSearchState().QuickSearchOperator;
            if (this.quickSearchOperator != null && this.quickSearchOperator != stateQuickSearchOperator) {
                this.quickSearchOperator = stateQuickSearchOperator;

                this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                    "ApplyQuickSearch",
                    "QuickSearch Operator has changed",
                    LeafExpressionOperator[this.quickSearchOperator])

                this.blotter.SearchService.ApplySearchOnGrid();
            }

            // Run search if the display type has changed
            let stateQuickSearchDisplayType: QuickSearchDisplayType = this.GetQuickSearchState().QuickSearchDisplayType;
            if (this.GetQuickSearchState != null && this.quickSearchDisplayType != stateQuickSearchDisplayType) {
                this.quickSearchDisplayType = stateQuickSearchDisplayType;

                this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                    "ApplyQuickSearch",
                    "QuickSearch DisplayType has changed",
                    QuickSearchDisplayType[this.quickSearchDisplayType])

                this.blotter.SearchService.ApplySearchOnGrid();
            }

            if (this.visibleColumns == null) {
                this.visibleColumns = this.getVisibleColumnIds();
            }

            // Run quick search if its been set and the actual visible columns have changed (not their order as that doesnt matter)
            // However this initial search and the compare is run every time any thing ever gets changed in teh state...
            let stateVisibleColumns: string[] = this.getVisibleColumnIds();

            if (!Helper.areArraysEqual(this.visibleColumns, stateVisibleColumns)) {
                this.visibleColumns = stateVisibleColumns;

                this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                    "ApplyQuickSearch",
                    "Columns have changed"
                )
                this.blotter.SearchService.ApplySearchOnGrid();
            }
        }
    }

    private getVisibleColumnIds(): string[] {
        return this.GetGridState().Columns.filter(c => c.Visible).map(c => {
            return c.ColumnId;
        })
    }

    private GetQuickSearchState(): QuickSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
    }

    private GetGridState(): GridState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Grid;
    }


}