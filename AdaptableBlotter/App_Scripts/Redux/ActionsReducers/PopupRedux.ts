/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { PopupState } from './Interface/IState';
import { IUIError, IUIWarning, IUIConfirmation } from '../../Core/Interface/IStrategy';

const SHOW_POPUP = 'SHOW_POPUP';
const HIDE_POPUP = 'HIDE_POPUP';
const HIDE_WARNINGPOPUP = 'HIDE_WARNINGPOPUP';
const HIDE_ERRORPOPUP = 'HIDE_ERRORPOPUP';
const HIDE_CONFIRMATIONPOPUP = 'HIDE_CONFIRMATIONPOPUP';
const ERROR_POPUP = 'ERROR_POPUP';
const WARNING_POPUP = 'WARNING_POPUP';
const CONFIRMATION_POPUP = 'CONFIRMATION_POPUP';
const CLEAR_POPUP_PARAM = 'CLEAR_POPUP_PARAM';

export interface ShowPopupAction extends Redux.Action {
    ComponentClassName: string,
    Params?: any
}

export interface HidePopupAction extends Redux.Action {

}

export interface HideErrorPopupAction extends Redux.Action {

}

export interface HideWarningPopupAction extends Redux.Action {

}

export interface HideConfirmationPopupAction extends Redux.Action {

}

export interface ErrorPopupAction extends Redux.Action {
    Error: IUIError
}

export interface WarningPopupAction extends Redux.Action {
    Warning: IUIWarning
}

export interface ConfirmationPopupAction extends Redux.Action {
    Confirmation: IUIConfirmation
}

export interface ClearPopupParamAction extends Redux.Action {

}

// export const showPopup: Redux.ActionCreator<ShowPopupAction> = (text: string) => ({
//     type: SHOW_POPUP,
//     text
// })

//we do not use Redux.ActionCreator as we want to be typed safe for the arguments..... Redux.ActionCreator doesnt really make any sense to me as a consequence!!!!
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

export const HideConfirmationPopup = (): HideConfirmationPopupAction => ({
    type: HIDE_CONFIRMATIONPOPUP
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
    ShowPopup: false,
    ShowErrorPopup: false,
    ShowWarningPopup: false,
    ShowConfirmationPopup: false,
    ComponentClassName: "",
    ErrorMsg: "",
    WarningMsg: "",
    ConfirmationMsg: "",
    ConfirmationText: "",
    CancelText: "",
    Params: null
}

export const ShowPopupReducer: Redux.Reducer<PopupState> = (state: PopupState = initialPopupState, action: Redux.Action): PopupState => {
    switch (action.type) {
        case SHOW_POPUP:
            let actionTypedShowPopup = (<ShowPopupAction>action)
            return Object.assign({}, state, { ShowPopup: true, ComponentClassName: actionTypedShowPopup.ComponentClassName, Params: actionTypedShowPopup.Params })
        case HIDE_POPUP:
            return Object.assign({}, state, { ShowPopup: false, ComponentClassName: "", Params: null })
        case HIDE_ERRORPOPUP:
            return Object.assign({}, state, { ShowErrorPopup: false, ErrorMsg: "" })
        case HIDE_WARNINGPOPUP:
            return Object.assign({}, state, { ShowWarningPopup: false, WarningMsg: "" })
        case HIDE_CONFIRMATIONPOPUP:
            return Object.assign({}, state, { ShowConfirmationPopup: false, ConfirmationMsg: "", ConfirmationText: "", CancelText: "" })
        case ERROR_POPUP:
            return Object.assign({}, state, { ShowErrorPopup: true, ErrorMsg: (<ErrorPopupAction>action).Error.ErrorMsg })
        case WARNING_POPUP:
            return Object.assign({}, state, { ShowWarningPopup: true, WarningMsg: (<WarningPopupAction>action).Warning.WarningMsg })
        case CONFIRMATION_POPUP:
            let actionTyped = (<ConfirmationPopupAction>action)
            return Object.assign({}, state, {
                ShowConfirmationPopup: true,
                ConfirmationMsg: actionTyped.Confirmation.ConfirmationMsg,
                ConfirmationText: actionTyped.Confirmation.ConfirmationText,
                CancelText: actionTyped.Confirmation.CancelText
            })
        case CLEAR_POPUP_PARAM:
            return Object.assign({}, state, { Params: null })
        default:
            return state
    }
}