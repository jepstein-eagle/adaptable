/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { PopupState, IErrorPopup, IWarningPopup, IConfirmationPopup, IActionConfigurationPopup } from './Interface/IState';
import { IUIError, IUIWarning, IUIConfirmation } from '../../Core/Interface/IStrategy';

const SHOW_POPUP = 'SHOW_POPUP';
const HIDE_POPUP = 'HIDE_POPUP';
const HIDE_WARNINGPOPUP = 'HIDE_WARNINGPOPUP';
const HIDE_ERRORPOPUP = 'HIDE_ERRORPOPUP';
export const CONFIRM_CONFIRMATIONPOPUP = 'CONFIRM_CONFIRMATIONPOPUP';
export const CANCEL_CONFIRMATIONPOPUP = 'CANCEL_CONFIRMATIONPOPUP';
const ERROR_POPUP = 'ERROR_POPUP';
const WARNING_POPUP = 'WARNING_POPUP';
const CONFIRMATION_POPUP = 'CONFIRMATION_POPUP';
const CLEAR_POPUP_PARAM = 'CLEAR_POPUP_PARAM';

export interface ShowPopupAction extends Redux.Action {
    ComponentClassName: string,
    Params?: any
}

export interface HidePopupAction extends Redux.Action { }

export interface HideErrorPopupAction extends Redux.Action { }

export interface HideWarningPopupAction extends Redux.Action { }

export interface ConfirmConfirmationPopupAction extends Redux.Action { }

export interface CancelConfirmationPopupAction extends Redux.Action { }

export interface ErrorPopupAction extends Redux.Action { Error: IUIError }

export interface WarningPopupAction extends Redux.Action { Warning: IUIWarning }

export interface ConfirmationPopupAction extends Redux.Action { Confirmation: IUIConfirmation }

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

export const ConfirmConfirmationPopup = (): ConfirmConfirmationPopupAction => ({
    type: CONFIRM_CONFIRMATIONPOPUP
})

export const CancelConfirmationPopup = (): CancelConfirmationPopupAction => ({
    type: CANCEL_CONFIRMATIONPOPUP
})

export const ErrorPopup = (Error: IUIError): ErrorPopupAction => ({
    type: ERROR_POPUP,
    Error
})

export const WarningPopup = (Warning: IUIWarning): WarningPopupAction => ({
    type: WARNING_POPUP,
    Warning
})

export const ConfirmationPopup = (Confirmation: IUIConfirmation): ConfirmationPopupAction => ({
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
        ConfirmationText: "",
        CancelText: "",
        CancelAction: null,
        ConfirmAction: null
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
        case CONFIRM_CONFIRMATIONPOPUP: {
            //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
            let newConfirmationPopup: IConfirmationPopup = {
                ShowConfirmationPopup: false,
                ConfirmationMsg: "",
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
                ConfirmationText: "",
                CancelText: "",
                ConfirmAction: null,
                CancelAction: null
            }
            return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup })
        }
        case ERROR_POPUP: {
            let newErrorPopup: IErrorPopup = { ShowErrorPopup: true, ErrorMsg: (<ErrorPopupAction>action).Error.ErrorMsg }
            return Object.assign({}, state, { ErrorPopup: newErrorPopup })
        }
        case WARNING_POPUP: {
            let newWarningPopup: IWarningPopup = { ShowWarningPopup: true, WarningMsg: (<WarningPopupAction>action).Warning.WarningMsg }
            return Object.assign({}, state, { WarningPopup: newWarningPopup })
        }
        case CONFIRMATION_POPUP: {
            let actionTyped = (<ConfirmationPopupAction>action)
            let newConfirmationPopup: IConfirmationPopup = {
                ShowConfirmationPopup: true,
                ConfirmationMsg: actionTyped.Confirmation.ConfirmationMsg,
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