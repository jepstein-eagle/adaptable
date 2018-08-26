import * as Redux from 'redux';
import { PopupState } from './Interface/IState';
import { IAlertPopup, IConfirmationPopup, IScreenPopup, IPromptPopup, IUIConfirmation, IUIPrompt, InputAction, IAlert, IChartPopup } from '../../Core/Interface/IMessage';
import { MessageType } from '../../Core/Enums';

export const POPUP_SHOW_SCREEN = 'POPUP_SHOW_SCREEN';
export const POPUP_HIDE_SCREEN = 'POPUP_HIDE_SCREEN';
export const POPUP_SHOW_CHART = 'POPUP_SHOW_CHART';
export const POPUP_HIDE_CHART = 'POPUP_HIDE_CHART';
export const POPUP_SHOW_ALERT = 'POPUP_SHOW_ALERT';
export const POPUP_HIDE_ALERT = 'POPUP_HIDE_ALERT';
export const POPUP_SHOW_PROMPT = 'POPUP_SHOW_PROMPT';
export const POPUP_HIDE_PROMPT = 'POPUP_HIDE_PROMPT';
export const POPUP_CONFIRM_PROMPT = 'POPUP_CONFIRM_PROMPT';
export const POPUP_SHOW_CONFIRMATION = 'POPUP_SHOW_CONFIRMATION';
export const POPUP_CONFIRM_CONFIRMATION = 'POPUP_CONFIRM_CONFIRMATION';
export const POPUP_CANCEL_CONFIRMATION = 'POPUP_CANCEL_CONFIRMATION';
export const POPUP_CLEAR_PARAM = 'POPUP_CLEAR_PARAM';

export interface PopupShowScreenAction extends Redux.Action {
    ComponentName: string,
    IsReadOnly: boolean,
    Params?: string
}

export interface PopupHideScreenAction extends Redux.Action { }

export interface PopupShowChartAction extends Redux.Action {}

export interface PopupHideChartAction extends Redux.Action { }

export interface PopupShowAlertAction extends Redux.Action { Alert: IAlert }

export interface PopupHideAlertAction extends Redux.Action { }

export interface PopupHidePromptAction extends Redux.Action { }

export interface PopupConfirmPromptAction extends InputAction { }

export interface PopupConfirmConfirmationAction extends Redux.Action {
    comment: string
}

export interface PopupCancelConfirmationAction extends Redux.Action { }

export interface PopupShowPromptAction extends Redux.Action { Prompt: IUIPrompt }

export interface PopupShowConfirmationAction extends Redux.Action { Confirmation: IUIConfirmation }

export interface PopupClearParamAction extends Redux.Action { }

export interface PopupChartClearParamAction extends Redux.Action { }


export const PopupShowScreen = (ComponentName: string, IsReadOnly?: boolean, Params?: string): PopupShowScreenAction => ({
    type: POPUP_SHOW_SCREEN,
    ComponentName,
    IsReadOnly,
    Params
})

export const PopupHideScreen = (): PopupHideScreenAction => ({
    type: POPUP_HIDE_SCREEN
})

export const PopupShowAlert = (Alert: IAlert): PopupShowAlertAction => ({
    type: POPUP_SHOW_ALERT,
    Alert
})

export const PopupHideAlert = (): PopupHideAlertAction => ({
    type: POPUP_HIDE_ALERT
})

export const PopupShowChart = (): PopupShowChartAction => ({
    type: POPUP_SHOW_CHART,
})

export const PopupHideChart = (): PopupHideChartAction => ({
    type: POPUP_HIDE_CHART
})

export const PopupShowPrompt = (Prompt: IUIPrompt): PopupShowPromptAction => ({
    type: POPUP_SHOW_PROMPT,
    Prompt
})

export const PopupHidePrompt = (): PopupHidePromptAction => ({
    type: POPUP_HIDE_PROMPT
})

export const PopupConfirmPrompt = (InputText: string): PopupConfirmPromptAction => ({
    type: POPUP_CONFIRM_PROMPT,
    InputText
})

export const PopupShowConfirmation = (Confirmation: IUIConfirmation): PopupShowConfirmationAction => ({
    type: POPUP_SHOW_CONFIRMATION,
    Confirmation
})

export const PopupConfirmConfirmation = (comment: string): PopupConfirmConfirmationAction => ({
    type: POPUP_CONFIRM_CONFIRMATION,
    comment
})

export const PopupCancelConfirmation = (): PopupCancelConfirmationAction => ({
    type: POPUP_CANCEL_CONFIRMATION
})

export const PopupClearParam = (): PopupClearParamAction => ({
    type: POPUP_CLEAR_PARAM
})

const initialPopupState: PopupState = {
    ScreenPopup: {
        ShowScreenPopup: false,
        ComponentName: "",
        IsReadOnly: false,
        Params: null
    },
    ChartPopup: {
        ShowChartPopup: false,
     },
    AlertPopup: {
        ShowAlertPopup: false,
        Header: "",
        Msg: "",
        MessageType: MessageType.Info
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
        case POPUP_SHOW_SCREEN: {
            let actionTypedShowPopup = (<PopupShowScreenAction>action)
            let newScreenPopup: IScreenPopup = { ShowScreenPopup: true, IsReadOnly: actionTypedShowPopup.IsReadOnly, ComponentName: actionTypedShowPopup.ComponentName, Params: actionTypedShowPopup.Params }
            return Object.assign({}, state, { ScreenPopup: newScreenPopup })
        }
        case POPUP_HIDE_SCREEN: {
            let newScreenPopup: IScreenPopup = { ShowScreenPopup: false, IsReadOnly: false, ComponentName: "", Params: null }
            return Object.assign({}, state, { ScreenPopup: newScreenPopup })
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
        case POPUP_HIDE_PROMPT: {
            let newPromptPopup: IPromptPopup = { ShowPromptPopup: false, PromptTitle: "", PromptMsg: "", ConfirmAction: null }
            return Object.assign({}, state, { PromptPopup: newPromptPopup })
        }
        case POPUP_CONFIRM_PROMPT: {
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newPromptPopup: IPromptPopup = { ShowPromptPopup: false, PromptTitle: "", PromptMsg: "", ConfirmAction: null }
            return Object.assign({}, state, { PromptPopup: newPromptPopup })
        }
        case POPUP_SHOW_CONFIRMATION: {
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
            let newAlertPopup: IAlertPopup = { ShowAlertPopup: true, Header: showAlertAction.Alert.Header, Msg: showAlertAction.Alert.Msg, MessageType: showAlertAction.Alert.MessageType }
            return Object.assign({}, state, { AlertPopup: newAlertPopup });
        }
        case POPUP_HIDE_ALERT: {
            let newAlertPopup: IAlertPopup = { ShowAlertPopup: false, Header: "", Msg: "", MessageType: MessageType.Info }
            return Object.assign({}, state, { AlertPopup: newAlertPopup })
        }
        case POPUP_SHOW_CHART: {
            let newChartPopup: IChartPopup = { ShowChartPopup: true }
            return Object.assign({}, state, { ChartPopup: newChartPopup })
       }
        case POPUP_HIDE_CHART: {
            let newChartPopup: IChartPopup = { ShowChartPopup: false }
            return Object.assign({}, state, { ChartPopup: newChartPopup })
        }
         case POPUP_CLEAR_PARAM: {
            let newScreenPopup: IScreenPopup = { ShowScreenPopup: state.ScreenPopup.ShowScreenPopup, IsReadOnly: state.ScreenPopup.IsReadOnly, ComponentName: state.ScreenPopup.ComponentName, Params: null }
            return Object.assign({}, state, { ScreenPopup: newScreenPopup })
        }

        default:
            return state
    }
}