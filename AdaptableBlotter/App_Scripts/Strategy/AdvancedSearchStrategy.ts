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
    private AdvancedSearchName: string
   
    private menuItemConfig: IMenuItem;
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AdvancedSearchStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("AdvancedSearch", this.Id, 'AdvancedSearchAction', MenuType.Action, "search");
        this.AdvancedSearchName = this.GetAdvancedSearchState().AdvancedSearchName
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, eventText) => this.handleDataSourceChanged(eventText))
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }

    InitState() {
        // Run search if the Advanced search has changed
        let stateAdvancedSearchName: string = this.GetAdvancedSearchState().AdvancedSearchName;
        if (StringExtensions.IsNotNull(this.AdvancedSearchName) && this.AdvancedSearchName != stateAdvancedSearchName) {
            this.AdvancedSearchName = stateAdvancedSearchName;
          //  this.blotter.SearchService.ApplyAdvancedSearchOnGrid();
        }

      
    }

    private handleDataSourceChanged(dataChangedEvent: IDataChangedEvent): void {
        if (StringExtensions.IsNotNullOrEmpty(this.AdvancedSearchName)) {
          //  this.blotter.SearchService.ApplyAdvancedSearchOnRow(dataChangedEvent.IdentifierValue);
        }
    }

    private GetAdvancedSearchState(): AdvancedSearchState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().AdvancedSearch;
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

}