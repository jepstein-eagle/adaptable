/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';

const SHOW_POPUP = 'SHOW_POPUP';
const HIDE_POPUP = 'HIDE_POPUP';

export interface ShowPopupAction extends Redux.Action {
    ComponentClassName: string
}

export interface HidePopupAction extends Redux.Action {

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

export interface PopupState {
    ShowPopup: boolean;
    ComponentClassName: string;
};

const initialPopupState: PopupState = {
    ShowPopup: false,
    ComponentClassName: ""
}

export const ShowPopupReducer: Redux.Reducer<PopupState> = (state: PopupState = initialPopupState, action: Redux.Action): PopupState => {
    switch (action.type) {
        case SHOW_POPUP:
            return { ShowPopup: true, ComponentClassName: (<ShowPopupAction>action).ComponentClassName }
        case HIDE_POPUP:
            return initialPopupState
        default:
            return state
    }
}


