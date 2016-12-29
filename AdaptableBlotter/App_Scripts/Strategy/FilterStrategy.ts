import { IFilterStrategy } from '../Core/Interface/IFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { INamedExpression } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { FilterState } from '../Redux/ActionsReducers/Interface/IState';


export class FilterStrategy extends AdaptableStrategyBase implements IFilterStrategy {
    private menuItemConfig: IMenuItem;
    private namedExpressions: INamedExpression[]


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FilterStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Filter", this.Id, 'FilterConfig', MenuType.Configuration, "filter");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    InitState() {
        if (this.namedExpressions != this.GetFilterState().Filters) {

            // call search service as search might need to re-run if its using a filter that has changed / been deleted
            // tell the search service that a filter has changed and it will decide if it needs to run search
            // get filter ids in old collection that are not in new one (as we dont care about new filters)
            if (this.namedExpressions != null && this.namedExpressions.length > 0) {
                let oldFilterUids: string[] = this.namedExpressions.filter(f => !f.IsPredefined).map(f => f.Uid);
                this.blotter.SearchService.ApplySearchOnFilters(oldFilterUids);
            }
            this.namedExpressions = this.GetFilterState().Filters;
        }

    }

    public CreateEmptyFilter(): INamedExpression {

        let namedExpression: INamedExpression = {
            Uid: Helper.generateUid(),
            FriendlyName: "",
            Description: "",
            ColumnType: ColumnType.String,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            IsExpressionSatisfied: (value: any): boolean => {
                return null;
            },
            IsPredefined: false
        };

        return namedExpression;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetFilterState(): FilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Filter;
    }
}


