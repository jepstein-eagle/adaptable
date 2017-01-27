import { NotificationType, CellChangeType, PopupType } from '../Enums';
import { IStrategy } from './IStrategy';
import { ICellChangeRule } from './ICellValidationStrategy';


export interface IAlertStrategy extends IStrategy{
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



export interface IAlertCommunicationInfo {
    SendEmail: boolean,
    EmailRecipients: string
    ShowPopup: boolean,
    PopupType: PopupType
}

