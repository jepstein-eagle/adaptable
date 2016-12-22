import { IQuickSearchStrategy } from '../Core/Interface/IQuickSearchStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { MenuType, CellStyle, LeafExpressionOperator, ColumnType } from '../Core/Enums';
import { ExpressionHelper, } from '../Core/Expression/ExpressionHelper';
import { Expression } from '../Core/Expression/Expression'
import { IExpressionRange } from '../Core/Interface/IExpression';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { StringExtensions } from '../Core/Extensions'
import { QuickSearchState } from '../Redux/ActionsReducers/Interface/IState'


export class QuickSearchStrategy extends AdaptableStrategyBase implements IQuickSearchStrategy {
    private quickSearchText: string
    private quickSearchOperator: LeafExpressionOperator
    private isCaseSenstive: Boolean

    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.QuickSearchStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("QuickSearch", this.Id, 'QuickSearchAction', MenuType.Configuration, "search");
        this.quickSearchText = "";
        this.quickSearchOperator = this.GetQuickSearchState().QuickSearchOperator
        this.isCaseSenstive = this.GetQuickSearchState().IsCaseSensitive;
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        // Run search if the quick search has changed
        let stateQuickSearchText: string = this.GetQuickSearchState().QuickSearchText;
        if (StringExtensions.IsNotNull(this.quickSearchText) && this.quickSearchText != stateQuickSearchText) {
            this.quickSearchText = stateQuickSearchText;
            this.blotter.SearchService.ApplySearchOnGrid();
        }

        // Run search if the operator has changed and search is not empty
        let stateQuickSearchOperator: LeafExpressionOperator = this.GetQuickSearchState().QuickSearchOperator;
        if (this.quickSearchOperator != null && this.quickSearchOperator != stateQuickSearchOperator && StringExtensions.IsNotNullOrEmpty(this.quickSearchText)) {
            this.quickSearchOperator = stateQuickSearchOperator;
            this.blotter.SearchService.ApplySearchOnGrid();
        }

        // Run search if the case sensitivity has changed and search is not empty
        let stateIsCaseSensitive: Boolean = this.GetQuickSearchState().IsCaseSensitive;
        if (this.isCaseSenstive != stateIsCaseSensitive && StringExtensions.IsNotNullOrEmpty(this.quickSearchText)) {
            this.isCaseSenstive = stateIsCaseSensitive;
            this.blotter.SearchService.ApplySearchOnGrid();
        }
    }

       private GetQuickSearchState(): QuickSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().QuickSearch;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

}