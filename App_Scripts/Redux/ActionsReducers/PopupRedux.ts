import * as Redux from 'redux';
import { PopupState } from './Interface/IState';
import { IAlertPopup, IConfirmationPopup, IScreenPopup, IPromptPopup, IUIConfirmation, IUIPrompt, InputAction, IAlert } from '../../Core/Interface/IMessage';
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';
import { AlertType } from '../../Core/Enums';
import { Alert } from 'react-bootstrap';

export const POPUP_SHOW = 'POPUP_SHOW';
export const POPUP_HIDE = 'POPUP_HIDE';
export const POPUP_HIDE_ALERT = 'POPUP_HIDE_ALERT';
export const POPUP_HIDE_PROMPT = 'POPUP_HIDE_PROMPT';
export const POPUP_CONFIRM_PROMPT = 'POPUP_CONFIRM_PROMPT';
export const POPUP_CONFIRM_CONFIRMATION = 'POPUP_CONFIRM_CONFIRMATION';
export const POPUP_CANCEL_CONFIRMATION = 'POPUP_CANCEL_CONFIRMATION';
export const POPUP_SHOW_ALERT = 'POPUP_SHOW_ALERT';
export const POPUP_SHOW_PROMPT = 'POPUP_SHOW_PROMPT';
export const POPUP_CONFIRMATION = 'POPUP_CONFIRMATION';
export const POPUP_CLEAR_PARAM = 'POPUP_CLEAR_PARAM';

export interface PopupShowAction extends Redux.Action {
    ComponentName: string,
    IsReadOnly: boolean,
    Params?: string
}

export interface PopupHideAction extends Redux.Action { }

export interface PopupHideAlertAction extends Redux.Action { }

export interface PopupHidePromptAction extends Redux.Action { }

export interface PopupConfirmPromptAction extends InputAction { }

export interface PopupConfirmConfirmationAction extends Redux.Action {
    comment: string
}

export interface PopupCancelConfirmationAction extends Redux.Action { }

export interface PopupShowAlertAction extends Redux.Action { Alert: IAlert }

export interface PopupShowPromptAction extends Redux.Action { Prompt: IUIPrompt }

export interface PopupShowConfirmationAction extends Redux.Action { Confirmation: IUIConfirmation }

export interface PopupClearParamAction extends Redux.Action { }


export const PopupShow = (ComponentName: string, IsReadOnly?: boolean, Params?: string): PopupShowAction => ({
    type: POPUP_SHOW,
    ComponentName,
    IsReadOnly,
    Params
})

export const PopupHide = (): PopupHideAction => ({
    type: POPUP_HIDE
})

export const PopupHideAlert = (): PopupHideAlertAction => ({
    type: POPUP_HIDE_ALERT
})

export const PopupHidePrompt = (): PopupHidePromptAction => ({
    type: POPUP_HIDE_PROMPT
})

export const PopupConfirmPrompt = (InputText: string): PopupConfirmPromptAction => ({
    type: POPUP_CONFIRM_PROMPT,
    InputText
})

export const PopupConfirmConfirmation = (comment: string): PopupConfirmConfirmationAction => ({
    type: POPUP_CONFIRM_CONFIRMATION,
    comment
})

export const PopupCancelConfirmation = (): PopupCancelConfirmationAction => ({
    type: POPUP_CANCEL_CONFIRMATION
})

export const PopupShowAlert = (Alert: IAlert): PopupShowAlertAction => ({
    type: POPUP_SHOW_ALERT,
    Alert
})

export const PopupShowPrompt = (Prompt: IUIPrompt): PopupShowPromptAction => ({
    type: POPUP_SHOW_PROMPT,
    Prompt
})

export const PopupShowConfirmation = (Confirmation: IUIConfirmation): PopupShowConfirmationAction => ({
    type: POPUP_CONFIRMATION,
    Confirmation
})

export const PopupClearParam = (): PopupClearParamAction => ({
    type: POPUP_CLEAR_PARAM
})


const initialPopupState: PopupState = {
    ScreenPopup: {
        ShowPopup: false,
        ComponentName: "",
        IsReadOnly: false,
        Params: null
    },
    AlertPopup: {
        ShowAlertPopup: false,
        Header: "",
        Msg: "",
        AlertType: AlertType.Info
    },
    ConfirmationPopup: {
        ShowConfirmationPopup: false,
        ConfirmationMsg: "",
        ConfirmationTitle: "",
        ConfirmationText: "",
        CancelText: "",
        CancelAction: null,
        ConfirmAction: null,
        ShowCommentBox: false,
        ConfirmationComment: null
    },
    PromptPopup: {
        ShowPromptPopup: false,
        PromptTitle: "",
        PromptMsg: "",
        ConfirmAction: null
    },

}

export const ShowPopupReducer: Redux.Reducer<PopupState> = (state: PopupState = initialPopupState, action: Redux.Action): PopupState => {
    switch (action.type) {
        case POPUP_SHOW: {
            let actionTypedShowPopup = (<PopupShowAction>action)
            let newScreenPopup: IScreenPopup = { ShowPopup: true, IsReadOnly: actionTypedShowPopup.IsReadOnly, ComponentName: actionTypedShowPopup.ComponentName, Params: actionTypedShowPopup.Params }
            return Object.assign({}, state, { ScreenPopup: newScreenPopup })
        }
        case POPUP_HIDE: {
            let newScreenPopup: IScreenPopup = { ShowPopup: false, IsReadOnly: false, ComponentName: "", Params: null }
            return Object.assign({}, state, { ScreenPopup: newScreenPopup, PreviewInfo: null })
        }
        case POPUP_HIDE_PROMPT: {
            let newPromptPopup: IPromptPopup = { ShowPromptPopup: false, PromptTitle: "", PromptMsg: "", ConfirmAction: null }
            return Object.assign({}, state, { PromptPopup: newPromptPopup })
        }
        case POPUP_CONFIRM_PROMPT: {
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newPromptPopup: IPromptPopup = { ShowPromptPopup: false, PromptTitle: "", PromptMsg: "", ConfirmAction: null }
            return Object.assign({}, state, { PromptPopup: newPromptPopup })
        }

        case POPUP_CONFIRM_CONFIRMATION: {
            let actionTyped = (<PopupConfirmConfirmationAction>action)
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup: IConfirmationPopup = {
                ShowConfirmationPopup: false,
                ConfirmationMsg: "",
                ConfirmationTitle: "",
                ConfirmationText: "",
                CancelText: "",
                ConfirmAction: null,
                CancelAction: null,
                ShowCommentBox: false,
                ConfirmationComment: actionTyped.comment
            }
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup })
        }
        case POPUP_CANCEL_CONFIRMATION: {
            //we dispatch the Action of CancelAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup: IConfirmationPopup = {
                ShowConfirmationPopup: false,
                ConfirmationMsg: "",
                ConfirmationTitle: "",
                ConfirmationText: "",
                CancelText: "",
                ConfirmAction: null,
                CancelAction: null,
                ShowCommentBox: false,
                ConfirmationComment: null
            }
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup })
        }
        case POPUP_SHOW_ALERT: {
            let showAlertAction = <PopupShowAlertAction>action;
            let newAlertPopup: IAlertPopup = { ShowAlertPopup: true, Header: showAlertAction.Alert.Header, Msg: showAlertAction.Alert.Msg, AlertType: showAlertAction.Alert.AlertType }
            return Object.assign({}, state, { AlertPopup: newAlertPopup });
        }
        case POPUP_HIDE_ALERT: {
            let newAlertPopup: IAlertPopup = { ShowAlertPopup: false, Header: "", Msg: "", AlertType: AlertType.Info }
            return Object.assign({}, state, { AlertPopup: newAlertPopup })
        }
        case POPUP_SHOW_PROMPT: {
            let actionTyped = (<PopupShowPromptAction>action)
            let newPromptPopup: IPromptPopup = {
                ShowPromptPopup: true,
                PromptTitle: actionTyped.Prompt.PromptTitle,
                PromptMsg: actionTyped.Prompt.PromptMsg,
                ConfirmAction: actionTyped.Prompt.ConfirmAction
            }
            return Object.assign({}, state, { PromptPopup: newPromptPopup })
        }
        case POPUP_CONFIRMATION: {
            let actionTyped = (<PopupShowConfirmationAction>action)
            let newConfirmationPopup: IConfirmationPopup = {
                ShowConfirmationPopup: true,
                ConfirmationMsg: actionTyped.Confirmation.ConfirmationMsg,
                ConfirmationTitle: actionTyped.Confirmation.ConfirmationTitle,
                ConfirmationText: actionTyped.Confirmation.ConfirmationText,
                CancelText: actionTyped.Confirmation.CancelText,
                ConfirmAction: actionTyped.Confirmation.ConfirmAction,
                CancelAction: actionTyped.Confirmation.CancelAction,
                ShowCommentBox: actionTyped.Confirmation.ShowCommentBox,
                ConfirmationComment: null
            }
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup })
        }
        case POPUP_CLEAR_PARAM: {
            let newScreenPopup: IScreenPopup = { ShowPopup: state.ScreenPopup.ShowPopup, IsReadOnly: state.ScreenPopup.IsReadOnly, ComponentName: state.ScreenPopup.ComponentName, Params: null }
            return Object.assign({}, state, { ScreenPopup: newScreenPopup })
        }

        default:
            return state
    }
}