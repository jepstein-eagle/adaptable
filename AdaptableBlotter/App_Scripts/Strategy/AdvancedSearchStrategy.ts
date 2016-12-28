import { IAdvancedSearchStrategy, IAdvancedSearch } from '../Core/Interface/IAdvancedSearchStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { MenuType } from '../Core/Enums';
import { ExpressionHelper, } from '../Core/Expression/ExpressionHelper';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState'
import { Helper } from '../Core/Helper';


export class AdvancedSearchStrategy extends AdaptableStrategyBase implements IAdvancedSearchStrategy {
    private AdvancedSearchState: AdvancedSearchState

    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AdvancedSearchStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Advanced Search", this.Id, 'AdvancedSearchAction', MenuType.Configuration, "search");
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
            // for the moment lets keep it really easy and simple
            // whenever ANYTHING changes in the search state, lets just run the CurrentAdvancedSearch
            // Only the CurrentSearch can be currently cleared or deleted or edited or added so any change means running search again...
            this.AdvancedSearchState = this.GetAdvancedSearchState();
            this.blotter.SearchService.ApplySearchOnGrid()
        }
    }

    public CreateEmptyAdvancedSearch(): IAdvancedSearch {
        return {
            Uid: Helper.generateUid(),
            Name: "",
            Expression: ExpressionHelper.CreateEmptyExpression(),
        }
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

}