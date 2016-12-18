import { IAlert } from '../Core/Interface/IAlertStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';

export class AlertStrategy extends AdaptableStrategyBase {
    private Alerts: IAlert[]
    private menuItemConfig: IMenuItem;


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AlertStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Alert", this.Id, 'AlertConfig', MenuType.Configuration, "exclamation-sign");
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
       
}


    InitState() {
        if (this.Alerts != this.GetAlertState().Alerts) {
            this.Alerts = this.GetAlertState().Alerts;
        }
       
    }

    
    
    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

      private GetAlertState(): AlertState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Alert;
    }
}


