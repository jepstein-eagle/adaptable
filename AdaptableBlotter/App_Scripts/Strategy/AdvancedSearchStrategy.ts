import { IAdvancedSearchStrategy } from '../Core/Interface/IAdvancedSearchStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { MenuType, CellStyle, LeafExpressionOperator, ColumnType } from '../Core/Enums';
import { ExpressionHelper, } from '../Core/Expression/ExpressionHelper';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo, } from '../Core/Expression/PredefinedExpressionHelper';
import { Expression } from '../Core/Expression/Expression'
import { IExpressionRange } from '../Core/Interface/IExpression';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { StringExtensions } from '../Core/Extensions'
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState'


export class AdvancedSearchStrategy extends AdaptableStrategyBase implements IAdvancedSearchStrategy {
    private AdvancedSearchState: AdvancedSearchState
   
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AdvancedSearchStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Advanced Search", this.Id, 'AdvancedSearchAction', MenuType.Action, "search");
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
       if (this.AdvancedSearchState != this.GetAdvancedSearchState()) {
            this.AdvancedSearchState = this.GetAdvancedSearchState();
        }
    }

    private handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
      //  if (StringExtensions.IsNotNullOrEmpty(this.AdvancedSearchName)) {
          //  this.blotter.SearchService.ApplyAdvancedSearchOnRow(dataChangedEvent.IdentifierValue);
      //  }
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

}