import { NotificationType, CellChangeType, PopupType } from '../Enums';

export interface IAlertStrategy{
    CreateEmptyAlert(): IAlert
    CreateEmptyCellChangeRule(): ICellChangeRule
}

export interface IAlert {
    NotificationType: NotificationType
    AlertCommunicationInfo: IAlertCommunicationInfo,
    AlertHeader: string,
    AlertBody: string,
    CellChangeRule: ICellChangeRule
}

export interface ICellChangeRule {
    ColumnId: string,
    CellChangeType: CellChangeType,
    ChangeValue: any,
}

export interface IAlertCommunicationInfo {
    SendEmail: boolean,
    EmailRecipients: string
    ShowPopup: boolean,
    PopupType: PopupType
}

