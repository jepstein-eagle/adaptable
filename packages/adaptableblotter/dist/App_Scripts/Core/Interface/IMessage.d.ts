import * as Redux from 'redux';
import { MessageType } from '../Enums';
export interface IAlert {
    Header: string;
    Msg: string;
    MessageType: MessageType;
}
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
    InputText: string;
}
export interface IUIPrompt {
    PromptTitle: string;
    PromptMsg: string;
    ConfirmAction: InputAction;
}
export interface IScreenPopup {
    ShowScreenPopup: boolean;
    ComponentName: string;
    IsReadOnly: boolean;
    Params: string;
}
export interface IChartPopup {
    ShowChartPopup: boolean;
}
export interface ILoadingPopup {
    ShowLoadingPopup: boolean;
}
export interface IAlertPopup {
    ShowAlertPopup: boolean;
    Header: string;
    Msg: string;
    MessageType: MessageType;
}
export interface IConfirmationPopup {
    ShowConfirmationPopup: boolean;
    ConfirmationTitle: string;
    ConfirmationMsg: string;
    ConfirmationText: string;
    CancelText: string;
    ConfirmAction: Redux.Action;
    CancelAction: Redux.Action;
    ShowCommentBox: boolean;
    ConfirmationComment: string;
}
export interface IPromptPopup {
    ShowPromptPopup: boolean;
    PromptTitle: string;
    PromptMsg: string;
    ConfirmAction: InputAction;
}
