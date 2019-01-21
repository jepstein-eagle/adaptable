import * as Redux from 'redux';
import { MessageType } from '../../Utilities/Enums';


export interface IAlert {
    Header: string,
    Msg: string;
    MessageType: MessageType
}

export interface IUIConfirmation {
    Header: string;
    Msg: string;
    ConfirmButtonText: string;
    CancelButtonText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
    ShowCommentBox: boolean;
    MessageType: MessageType
}

export interface InputAction extends Redux.Action {
    InputText: string
}


export interface IUIPrompt {
    Header: string;
    Msg: string;
    ConfirmAction: InputAction;
}

export interface IScreenPopup {
    ShowScreenPopup: boolean;
    ComponentStrategy: string;
    ComponentName: string;
    Params: string
}

export interface IChartPopup {
    ShowChartPopup: boolean;
 }

export interface ILoadingPopup {
    ShowLoadingPopup: boolean;
 }

export interface IAboutPopup {
    ShowAboutPopup: boolean;
 }

export interface IAlertPopup {
    ShowAlertPopup: boolean;
    Header: string,
    Msg: string;
    MessageType: MessageType
}


export interface IConfirmationPopup {
    ShowConfirmationPopup: boolean;
    Header: string;
    Msg: string;
    ConfirmButtonText: string;
    CancelButtonText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
    ShowCommentBox: boolean,
    ConfirmationComment: string;
    MessageType: MessageType
}

export interface IPromptPopup {
    ShowPromptPopup: boolean;
    Header: string;
    Msg: string;
    ConfirmAction: InputAction;
}