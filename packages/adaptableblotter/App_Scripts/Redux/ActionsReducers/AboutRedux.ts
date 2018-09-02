import * as Redux from 'redux'
import { AboutState } from './Interface/IState';
import { KeyValuePair } from '../../View/UIInterfaces';

export const ABOUT_INFO_CREATE = 'ABOUT_INFO_CREATE';
export const ABOUT_INFO_SET = 'ABOUT_INFO_SET';

export interface AboutInfoCreateAction extends Redux.Action {
}

export interface AboutInfoSetAction extends Redux.Action {
    AboutInfo: KeyValuePair[]
}

export const AboutInfoCreate = (): AboutInfoCreateAction => ({
    type: ABOUT_INFO_CREATE
})

export const AboutInfoSet = (AboutInfo: KeyValuePair[]): AboutInfoSetAction => ({
    type: ABOUT_INFO_SET,
    AboutInfo
})


const initialAboutState: AboutState = {
    AboutInfo: []
}

export const AboutReducer: Redux.Reducer<AboutState> = (state: AboutState = initialAboutState, action: Redux.Action): AboutState => {
    switch (action.type) {
        case ABOUT_INFO_SET:
            return Object.assign({}, state, { AboutInfo: (<AboutInfoSetAction>action).AboutInfo })

        default:
            return state
    }
}

