import { INamedExpressionStrategy } from '../Core/Interface/INamedExpressionStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, ColumnType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { INamedExpression } from '../Core/Interface/IExpression';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { Helper } from '../Core/Helper';
import { NamedExpressionState } from '../Redux/ActionsReducers/Interface/IState';


export class NamedExpressionStrategy extends AdaptableStrategyBase implements INamedExpressionStrategy {
    private menuItemConfig: IMenuItem;
    private namedExpressions: INamedExpression[]


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.NamedExpressionStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Filter", this.Id, 'NamedExpressionConfig', MenuType.Configuration, "filter");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    InitState() {
        if (this.namedExpressions != this.GetNamedExpressionState().NamedExpressions) {

            // call search service as search might need to re-run if its using a filter that has changed / been deleted
            // tell the search service that a filter has changed and it will decide if it needs to run search
            // get filter ids in old collection that are not in new one (as we dont care about new named expressions)
            if (this.namedExpressions != null && this.namedExpressions.length > 0) {
                let oldFilterUids: string[] = this.namedExpressions.filter(f => !f.IsPredefined).map(f => f.Uid);
                this.blotter.SearchService.ApplySearchOnNamedExpressions(oldFilterUids);
            }
            this.namedExpressions = this.GetNamedExpressionState().NamedExpressions;
        }
    }

    public CreateEmptyNamedExpression(): INamedExpression {

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

    private GetNamedExpressionState(): NamedExpressionState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().NamedExpression;
    }
}


