import { IUserFilterStrategy } from '../Core/Interface/IUserFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IUserFilter } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { UserFilterState } from '../Redux/ActionsReducers/Interface/IState';


export class UserFilterStrategy extends AdaptableStrategyBase implements IUserFilterStrategy {
    private menuItemConfig: IMenuItem;
    private userFilters: IUserFilter[]


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.UserFilterStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("User Filter", this.Id, 'UserFilterConfig', MenuType.Configuration, "filter");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    InitState() {
        if (this.userFilters != this.GetUserFilterState().UserFilters) {

            // call search service as search might need to re-run if its using a filter that has changed / been deleted
            // tell the search service that a filter has changed and it will decide if it needs to run search
            // get filter ids in old collection that are not in new one (as we dont care about new user filter expressions)
            if (this.userFilters != null && this.userFilters.length > 0) {
            
                let oldFilterUids: string[] = this.userFilters.filter(f => !f.IsPredefined).map(f => f.Uid);
                this.blotter.SearchService.ApplySearchOnUserFilter(oldFilterUids);

                // also rerun column filter - but do it every time that user filters are changed - which wont be often
                this.blotter.applyColumnFilters();
            }
            this.userFilters = this.GetUserFilterState().UserFilters;
        }
    }

    public CreateEmptyUserFilter(): IUserFilter {

        let userFilter: IUserFilter = {
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

        return userFilter;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetUserFilterState(): UserFilterState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().UserFilter;
    }
}


