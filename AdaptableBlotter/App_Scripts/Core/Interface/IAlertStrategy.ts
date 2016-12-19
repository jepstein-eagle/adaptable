import { NotificationType, CellChangeType, PopupType } from '../Enums';


export interface IAlert {
    NotificationType: NotificationType
    AlertEmailInfo: IAlertEmailInfo,
    AlertPopupInfo: IAlertPopupInfo,
    AlertText: string,
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
            SendEmail: true,
            EmailRecipients: ""
        }

        let popupInfo: IAlertPopupInfo = {
            ShowPopup: false,
            PopupType: PopupType.DisappearAutomatically
        }

        var alert1: IAlert = {
            NotificationType: NotificationType.CellUpdated,
            CellChangeRule: cellChangeRule,
            AlertEmailInfo: emailInfo,
            AlertPopupInfo: popupInfo,
            AlertText: "hello",
        }

        returnAlerts.push(alert1);
        return returnAlerts;
    }

}