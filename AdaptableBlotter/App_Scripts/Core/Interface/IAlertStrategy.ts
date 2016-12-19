import { NotificationType, CellChangeType, PopupType } from '../Enums';

export interface IAlertStrategy{
    CreateEmptyAlert(): IAlert
    CreateEmptyCellChangeRule(): ICellChangeRule
}

export interface IAlert {
    NotificationType: NotificationType
    AlertEmailInfo: IAlertEmailInfo,
    AlertPopupInfo: IAlertPopupInfo,
    AlertHeader: string,
    AlertBody: string,
    CellChangeRule: ICellChangeRule
}

export interface ICellChangeRule {
    ColumnId: string,
    CellChangeType: CellChangeType,
    ChangeValue: any,
}

export interface IAlertEmailInfo {
    SendEmail: boolean,
    EmailRecipients: string
}

export interface IAlertPopupInfo {
    ShowPopup: boolean,
    PopupType: PopupType
}

export class TempNotificationCreator {
    public CreateTempAlerts(): IAlert[] {
        let returnAlerts: IAlert[] = []

        let cellChangeRule: ICellChangeRule = {
            ColumnId: "bid",
            CellChangeType: CellChangeType.GreaterThan,
            ChangeValue: 5,
        }

        let emailInfo: IAlertEmailInfo = {
            SendEmail: false,
            EmailRecipients: ""
        }

        let popupInfo: IAlertPopupInfo = {
            ShowPopup: true,
            PopupType: PopupType.DisappearAutomatically
        }

        var alert1: IAlert = {
            NotificationType: NotificationType.CellUpdated,
            CellChangeRule: cellChangeRule,
            AlertEmailInfo: emailInfo,
            AlertPopupInfo: popupInfo,
            AlertHeader: "Bid Updated",
            AlertBody: "The value in the Bid Column has updated",
        }

        returnAlerts.push(alert1);
        return returnAlerts;
    }

  

}