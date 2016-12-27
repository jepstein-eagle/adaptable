import { IFilterStrategy } from '../Core/Interface/IFilterStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { FilterState } from '../Redux/ActionsReducers/Interface/IState';
import { INamedExpression } from '../Core/Interface/IExpression';
import { Expression } from '../Core/Expression/Expression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';


export class FilterStrategy extends AdaptableStrategyBase implements IFilterStrategy {
    private Filters: INamedExpression[]
    private menuItemConfig: IMenuItem;

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.FilterStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Filter", this.Id, 'FilterConfig', MenuType.Configuration, "filter");
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        if (this.Filters != this.GetFilterState().Filters) {
            this.Filters = this.GetFilterState().Filters;
        }
    }

      public CreateEmptyFilter(): INamedExpression {

        let namedExpression: INamedExpression = {
             Uid: Helper.generateUid(),
            FriendlyName: "",
            ColumnType: ColumnType.String,
            Expression: ExpressionHelper.CreateEmptyExpression(),
            isExpressionSatisfied: (value: any): boolean => {
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


