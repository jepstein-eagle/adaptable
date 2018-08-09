import * as Redux from 'redux';
import { MessageType } from '../Enums';


export interface IAlert {
    Header: string,
    Msg: string;
    MessageType: MessageType
}

export abstract class AlertBase implements IAlert {
    Header: string;    
    Msg: string;
    MessageType: MessageType;

   
}

export class ErrorAlert extends AlertBase implements IAlert {
    constructor() {
        super()
        this.MessageType = MessageType.Error
    }
}

export class WarningAlert extends AlertBase implements IAlert {
    constructor() {
        super()
        this.MessageType = MessageType.Warning
    }
}

export class InfoAlert extends AlertBase implements IAlert {
    constructor() {
        super()
        this.MessageType = MessageType.Info
    }
}
//export interface IUIError {
 //   ErrorHeader: string,
 //   ErrorMsg: string;
//}

//export interface IUIWarning {
//    WarningHeader: string,
 //   WarningMsg: string;
//}

//export interface IUIInfo {
 //   InfoHeader: string,
 //   InfoMsg: string;
//}

export interface IUIConfirmation {
    ConfirmationTitle: string;
    ConfirmationMsg: string;
    ConfirmationText: string;
    CancelText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
    ShowCommentBox: boolean;
}

export interface InputAction extends Redux.Action {
    InputText: string
}


export interface IUIPrompt {
    PromptTitle: string;
    PromptMsg: string;
    ConfirmAction: InputAction;
}

export interface IScreenPopup {
    ShowPopup: boolean;
    ComponentName: string;
    IsReadOnly: boolean
    Params: string
}

export interface IAlertPopup {
    ShowAlertPopup: boolean;
    Header: string,
    Msg: string;
    MessageType: MessageType
}

//export interface IWarningPopup {
//    ShowWarningPopup: boolean;
//    WarningHeader: string,
//    WarningMsg: string;
//}

//export interface IInfoPopup {
 //   ShowInfoPopup: boolean;
 //   InfoHeader: string,
 //   InfoMsg: string;
//}

export interface IConfirmationPopup {
    ShowConfirmationPopup: boolean;
    ConfirmationTitle: string;
    ConfirmationMsg: string;
    ConfirmationText: string;
    CancelText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
    ShowCommentBox: boolean,
    ConfirmationComment: string;
}

export interface IPromptPopup {
    ShowPromptPopup: boolean;
    PromptTitle: string;
    PromptMsg: string;
    ConfirmAction: InputAction;
}