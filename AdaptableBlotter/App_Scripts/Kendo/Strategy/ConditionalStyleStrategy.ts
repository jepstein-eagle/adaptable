import { ConditionalStyleState } from '../../Redux/ActionsReducers/Interface/IState';
import { IConditionalStyleStrategy } from '../../Core/Interface/IConditionalStyleStrategy';
import { MenuItemShowPopup } from '../../Core/MenuItem';
import { AdaptableStrategyBase } from '../../Core/AdaptableStrategyBase';
import * as StrategyIds from '../../Core/StrategyIds'
import { IMenuItem } from '../../Core/Interface/IStrategy';
import { ColumnType } from '../../Core/Enums'
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper'
import { IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { Helper } from '../../Core/Helper';

export class ConditionalStyleStrategy extends AdaptableStrategyBase implements IConditionalStyleStrategy {
    private menuItemConfig: IMenuItem;
    private ConditionalStyleState: ConditionalStyleState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ConditionalStyleStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Configure Conditional Style", this.Id, 'ConditionalStyleConfig', "plus-sign");
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitConditionalStyle())
       // blotter.OnKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }

    private InitConditionalStyle() {
        if (this.ConditionalStyleState != this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle) {
            this.ConditionalStyleState = this.blotter.AdaptableBlotterStore.TheStore.getState().ConditionalStyle;
        }
    }

  

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


