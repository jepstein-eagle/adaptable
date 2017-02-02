/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { PopupState} from './Interface/IState';
import {IUIError, IUIWarning} from '../../Core/Interface/IStrategy';

const SHOW_POPUP = 'SHOW_POPUP';
const HIDE_POPUP = 'HIDE_POPUP';
const ERROR_POPUP = 'ERROR_POPUP';
const WARNING_POPUP = 'WARNING_POPUP';
const CLEAR_POPUP_PARAM = 'CLEAR_POPUP_PARAM';

export interface ShowPopupAction extends Redux.Action {
    ComponentClassName: string,
    Params?: any
}

export interface HidePopupAction extends Redux.Action {

}

export interface ErrorPopupAction extends Redux.Action {
    Error: IUIError
}

export interface WarningPopupAction extends Redux.Action {
    Warning: IUIWarning
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

export const ErrorPopup = (Error: IUIError): ErrorPopupAction => ({
    type: ERROR_POPUP,
    Error
})

export const WarningPopup = (Warning: IUIWarning): WarningPopupAction => ({
    type: WARNING_POPUP,
    Warning
})

export const ClearPopupParam = (): ClearPopupParamAction => ({
    type: CLEAR_POPUP_PARAM
})

const initialPopupState: PopupState = {
    ShowPopup: false,
    ShowErrorPopup: false,
    ShowWarningPopup: false,
    ComponentClassName: "",
    ErrorMsg: "",
    WarningMsg: "",
    Params: null
}

export const ShowPopupReducer: Redux.Reducer<PopupState> = (state: PopupState = initialPopupState, action: Redux.Action): PopupState => {
    switch (action.type) {
        case SHOW_POPUP:
           let actionTypedShowPopup = (<ShowPopupAction>action)
            return  Object.assign({}, state, { ShowPopup: true, ComponentClassName: actionTypedShowPopup.ComponentClassName, Params: actionTypedShowPopup.Params  })
        case HIDE_POPUP:
            return initialPopupState
        case ERROR_POPUP:
            return  Object.assign({}, initialPopupState, {  ShowErrorPopup: true, ErrorMsg: (<ErrorPopupAction>action).Error.ErrorMsg })
        case WARNING_POPUP:
            return  Object.assign({}, initialPopupState, {  ShowWarningPopup: true, WarningMsg: (<WarningPopupAction>action).Warning.WarningMsg })
         case CLEAR_POPUP_PARAM:
             return  Object.assign({}, state, { Params: null })
        default:
            return state
    }
}