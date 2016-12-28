import { IAlert, IAlertStrategy, ICellChangeRule, IAlertCommunicationInfo } from '../Core/Interface/IAlertStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy';
import { MenuType, NotificationType, CellChangeType, PopupType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { AlertState } from '../Redux/ActionsReducers/Interface/IState';

export class AlertStrategy extends AdaptableStrategyBase implements IAlertStrategy {
    private alerts: IAlert[]
    private menuItemConfig: IMenuItem;


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.AlertStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Alert", this.Id, 'AlertConfig', MenuType.Configuration, "exclamation-sign");
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
    }


    InitState() {
        if (this.alerts != this.GetAlertState().Alerts) {
            this.alerts = this.GetAlertState().Alerts;
        }

    }

    public CreateEmptyAlert(): IAlert {

        let alertCommunicationInfo: IAlertCommunicationInfo = {
            SendEmail: false,
            EmailRecipients: "",
            ShowPopup: true,
            PopupType: PopupType.DisappearAutomatically
        }

        let newAlert: IAlert = {
            NotificationType: NotificationType.CellUpdated,
            AlertCommunicationInfo: alertCommunicationInfo,
            AlertHeader: "",
            AlertBody: "",
            CellChangeRule: this.CreateEmptyCellChangeRule(),
        }
        return newAlert;
    }

    public CreateEmptyCellChangeRule(): ICellChangeRule {
        let newCellChangeRule: ICellChangeRule = {
            ColumnId: "select",
            ChangeValue: null,
            CellChangeType: CellChangeType.Any
        }
        return newCellChangeRule;
    }

   public getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }

    private GetAlertState(): AlertState {
        return this.blotter.AdaptableBlotterStore.TheStore.getState().Alert;
    }
}


