/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { PopupState, IErrorPopup, IWarningPopup, IConfirmationPopup, IActionConfigurationPopup, IPromptPopup } from './Interface/IState';
import { IUIError, IUIWarning, IUIConfirmation, IUIPrompt } from '../../Core/Interface/IStrategy';

const SHOW_POPUP = 'SHOW_POPUP';
const HIDE_POPUP = 'HIDE_POPUP';
const HIDE_ERRORPOPUP = 'HIDE_ERRORPOPUP';
const HIDE_WARNINGPOPUP = 'HIDE_WARNINGPOPUP';
const HIDE_PROMPTPOPUP = 'HIDE_PROMPTPOPUP';
export const CONFIRM_PROMPTPOPUP = 'CONFIRM_PROMPTPOPUP';
export const CONFIRM_CONFIRMATIONPOPUP = 'CONFIRM_CONFIRMATIONPOPUP';
export const CANCEL_CONFIRMATIONPOPUP = 'CANCEL_CONFIRMATIONPOPUP';
const SHOW_ERROR_POPUP = 'SHOW_ERROR_POPUP';
const SHOW_WARNING_POPUP = 'SHOW_WARNING_POPUP';
const SHOW_PROMPT_POPUP = 'SHOW_PROMPT_POPUP';
const CONFIRMATION_POPUP = 'CONFIRMATION_POPUP';
const CLEAR_POPUP_PARAM = 'CLEAR_POPUP_PARAM';

export interface ShowPopupAction extends Redux.Action {
    ComponentClassName: string,
    Params?: any
}

export interface HidePopupAction extends Redux.Action { }

export interface HideErrorPopupAction extends Redux.Action { }

export interface HideWarningPopupAction extends Redux.Action { }

export interface HidePromptPopupAction extends Redux.Action { }

export interface ConfirmPromptPopupAction extends Redux.Action { inputText: string }

export interface ConfirmConfirmationPopupAction extends Redux.Action { }

export interface CancelConfirmationPopupAction extends Redux.Action { }

export interface ShowErrorPopupAction extends Redux.Action { Error: IUIError }

export interface ShowWarningPopupAction extends Redux.Action { Warning: IUIWarning }

export interface ShowPromptPopupAction extends Redux.Action { Prompt: IUIPrompt }

export interface ShowConfirmationPopupAction extends Redux.Action { Confirmation: IUIConfirmation }

export interface ClearPopupParamAction extends Redux.Action { }

export const ShowPopup = (ComponentClassName: string, Params?: any): ShowPopupAction => ({
    type: SHOW_POPUP,
    ComponentClassName,
    Params
})

export const HidePopup = (): HidePopupAction => ({
    type: HIDE_POPUP
})

export const HideErrorPopup = (): HideErrorPopupAction => ({
    type: HIDE_ERRORPOPUP
})

export const HideWarningPopup = (): HideWarningPopupAction => ({
    type: HIDE_WARNINGPOPUP
})

export const HidePromptPopup = (): HidePromptPopupAction => ({
    type: HIDE_PROMPTPOPUP
})

export const ConfirmPromptPopup = (inputText: string): ConfirmPromptPopupAction => ({
    type: CONFIRM_PROMPTPOPUP,
    inputText
})

export const ConfirmConfirmationPopup = (): ConfirmConfirmationPopupAction => ({
    type: CONFIRM_CONFIRMATIONPOPUP
})

export const CancelConfirmationPopup = (): CancelConfirmationPopupAction => ({
    type: CANCEL_CONFIRMATIONPOPUP
})

export const ShowErrorPopup = (Error: IUIError): ShowErrorPopupAction => ({
    type: SHOW_ERROR_POPUP,
    Error
})

export const ShowWarningPopup = (Warning: IUIWarning): ShowWarningPopupAction => ({
    type: SHOW_WARNING_POPUP,
    Warning
})

export const ShowPromptPopup = (Prompt: IUIPrompt): ShowPromptPopupAction => ({
    type: SHOW_PROMPT_POPUP,
    Prompt
})

export const ShowConfirmationPopup = (Confirmation: IUIConfirmation): ShowConfirmationPopupAction => ({
    type: CONFIRMATION_POPUP,
    Confirmation
})

export const ClearPopupParam = (): ClearPopupParamAction => ({
    type: CLEAR_POPUP_PARAM
})

const initialPopupState: PopupState = {
    ActionConfigurationPopup: {
        ShowPopup: false,
        ComponentClassName: "",
        Params: null
    },
    ErrorPopup: {
        ShowErrorPopup: false,
        ErrorMsg: ""
    },
    WarningPopup: {
        ShowWarningPopup: false,
        WarningMsg: ""
    },
    ConfirmationPopup: {
        ShowConfirmationPopup: false,
        ConfirmationMsg: "",
        ConfirmationTitle: "",
        ConfirmationText: "",
        CancelText: "",
        CancelAction: null,
        ConfirmAction: null
    },
    PromptPopup: {
        ShowPromptPopup: false,
        PromptTitle: "",
        PromptMsg: "",
     }
}

export const ShowPopupReducer: Redux.Reducer<PopupState> = (state: PopupState = initialPopupState, action: Redux.Action): PopupState => {
    switch (action.type) {
        case SHOW_POPUP: {
            let actionTypedShowPopup = (<ShowPopupAction>action)
            let newActionConfigurationPopup: IActionConfigurationPopup = { ShowPopup: true, ComponentClassName: actionTypedShowPopup.ComponentClassName, Params: actionTypedShowPopup.Params }
            return Object.assign({}, state, { ActionConfigurationPopup: newActionConfigurationPopup })
        }
        case HIDE_POPUP: {
            let newActionConfigurationPopup: IActionConfigurationPopup = { ShowPopup: false, ComponentClassName: "", Params: null }
            return Object.assign({}, state, { ActionConfigurationPopup: newActionConfigurationPopup })
        }
        case HIDE_ERRORPOPUP: {
            let newErrorPopup: IErrorPopup = { ShowErrorPopup: false, ErrorMsg: "" }
            return Object.assign({}, state, { ErrorPopup: newErrorPopup })
        }
        case HIDE_WARNINGPOPUP: {
            let newWarningPopup: IWarningPopup = { ShowWarningPopup: false, WarningMsg: "" }
            return Object.assign({}, state, { WarningPopup: newWarningPopup })
        }
        case HIDE_PROMPTPOPUP: {
            let newPromptPopup: IPromptPopup = { ShowPromptPopup: false, PromptTitle: "", PromptMsg: "" }
            return Object.assign({}, state, { PromptPopup: newPromptPopup })
        }
        case CONFIRM_PROMPTPOPUP: {
            let actionTyped = (<ConfirmPromptPopupAction>action)
            let newPromptPopup: IPromptPopup = { ShowPromptPopup: false, PromptTitle: "", PromptMsg: ""}
            return Object.assign({}, state, { PromptPopup: newPromptPopup })
        }

        case CONFIRM_CONFIRMATIONPOPUP: {
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup: IConfirmationPopup = {
                ShowConfirmationPopup: false,
                ConfirmationMsg: "",
                ConfirmationTitle: "",
                ConfirmationText: "",
                CancelText: "",
                ConfirmAction: null,
                CancelAction: null
            }
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup })
        }
        case CANCEL_CONFIRMATIONPOPUP: {
            //we dispatch the Action of CancelAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup: IConfirmationPopup = {
                ShowConfirmationPopup: false,
                ConfirmationMsg: "",
                ConfirmationTitle: "",
                ConfirmationText: "",
                CancelText: "",
                ConfirmAction: null,
                CancelAction: null
            }
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup })
        }
        case SHOW_ERROR_POPUP: {
            let newErrorPopup: IErrorPopup = { ShowErrorPopup: true, ErrorMsg: (<ShowErrorPopupAction>action).Error.ErrorMsg }
            return Object.assign({}, state, { ErrorPopup: newErrorPopup })
        }
        case SHOW_WARNING_POPUP: {
            let newWarningPopup: IWarningPopup = { ShowWarningPopup: true, WarningMsg: (<ShowWarningPopupAction>action).Warning.WarningMsg }
            return Object.assign({}, state, { WarningPopup: newWarningPopup })
        }
        case SHOW_PROMPT_POPUP: {
            let actionTyped = (<ShowPromptPopupAction>action)
            let newPromptPopup: IPromptPopup = {
                ShowPromptPopup: true,
                PromptTitle: actionTyped.Prompt.PromptTitle,
                PromptMsg: actionTyped.Prompt.PromptMsg,
             }
            return Object.assign({}, state, { PromptPopup: newPromptPopup })
        }
        case CONFIRMATION_POPUP: {
            let actionTyped = (<ShowConfirmationPopupAction>action)
            let newConfirmationPopup: IConfirmationPopup = {
                ShowConfirmationPopup: true,
                ConfirmationMsg: actionTyped.Confirmation.ConfirmationMsg,
                ConfirmationTitle: actionTyped.Confirmation.ConfirmationTitle,
                ConfirmationText: actionTyped.Confirmation.ConfirmationText,
                CancelText: actionTyped.Confirmation.CancelText,
                ConfirmAction: actionTyped.Confirmation.ConfirmAction,
                CancelAction: actionTyped.Confirmation.CancelAction
            }
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup })
        }
        case CLEAR_POPUP_PARAM: {
            let newActionConfigurationPopup: IActionConfigurationPopup = { ShowPopup: state.ActionConfigurationPopup.ShowPopup, ComponentClassName: state.ActionConfigurationPopup.ComponentClassName, Params: null }
            return Object.assign({}, state, { ActionConfigurationPopup: newActionConfigurationPopup })
        }
        default:
            return state
    }
}