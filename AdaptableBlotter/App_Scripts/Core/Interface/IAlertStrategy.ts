import { NotificationType, CellChangeType } from '../Enums';


export interface IAlert {
    NotificationType: NotificationType
    SendEmail: Boolean,
    ShowPopup: Boolean,
    AlertText: string,
    CellChangeRule: ICellChangeRule
}

export interface ICellChangeRule {
    ColumnId: string,
    CellChangeType: CellChangeType,
    ChangeValue: any,
}

export class TempNotificationCreator {
    public CreateTempAlerts(): IAlert[] {
        let returnAlerts: IAlert[] = []

        let cellChangeRule1: ICellChangeRule = {
            ColumnId: "bid",
            CellChangeType: CellChangeType.GreaterThan,
            ChangeValue: 5,
        }

        var alert1: IAlert = {
            NotificationType: NotificationType.CellUpdated,
            CellChangeRule: cellChangeRule1,
            ShowPopup: false,
            SendEmail: true,
            AlertText: "hello",
         }

        returnAlerts.push(alert1);
        return returnAlerts;
    }

}