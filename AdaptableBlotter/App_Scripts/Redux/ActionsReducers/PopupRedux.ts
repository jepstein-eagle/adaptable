/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';

const SHOW_POPUP = 'SHOW_POPUP';
const HIDE_POPUP = 'HIDE_POPUP';
const ERROR_POPUP = 'ERROR_POPUP';

export interface ShowPopupAction extends Redux.Action {
    ComponentClassName: string
}

export interface HidePopupAction extends Redux.Action {

}

export interface ErrorPopupAction extends Redux.Action {
    Error: IUIError
}

// export const showPopup: Redux.ActionCreator<ShowPopupAction> = (text: string) => ({
//     type: SHOW_POPUP,
//     text
// })

//we do not use Redux.ActionCreator as we want to be typed safe for the arguments..... Redux.ActionCreator doesnt really make any sense to me as a consequence!!!!
export const ShowPopup = (ComponentClassName: string, PopupProps: any): ShowPopupAction => ({
    type: SHOW_POPUP,
    ComponentClassName
})

export const HidePopup = (): HidePopupAction => ({
    type: HIDE_POPUP
})

export const ErrorPopup = (Error: IUIError): ErrorPopupAction => ({
    type: ERROR_POPUP,
    Error
})

const initialPopupState: PopupState = {
    ShowPopup: false,
    ShowErrorPopup: false,
    ComponentClassName: "",
    ErrorMsg: ""
}

export const ShowPopupReducer: Redux.Reducer<PopupState> = (state: PopupState = initialPopupState, action: Redux.Action): PopupState => {
    switch (action.type) {
        case SHOW_POPUP:
            //first {} is important as we need to clone the state and not amend it
            return  Object.assign({}, state, { ShowPopup: true, ComponentClassName: (<ShowPopupAction>action).ComponentClassName })
        case HIDE_POPUP:
            return initialPopupState
        case ERROR_POPUP:
            //first {} is important as we need to clone the state and not amend it
            return  Object.assign({}, initialPopupState, {  ShowErrorPopup: true, ErrorMsg: (<ErrorPopupAction>action).Error.ErrorMsg })
        default:
            return state
    }
}


