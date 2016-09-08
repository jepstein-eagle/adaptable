/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import {PlusMinusState} from './Interface/IState';

export const PLUSMINUS_SET_DEFAULT_NUDGE = 'PLUSMINUS_SET_DEFAULT_NUDGE';

export interface PlusMinusSetDefaultNudgeAction extends Redux.Action {
    value: number
}

export const PlusMinusSetDefaultNudge = (value: number): PlusMinusSetDefaultNudgeAction => ({
    type: PLUSMINUS_SET_DEFAULT_NUDGE,
    value
})

const initialPlusMinusState: PlusMinusState = {
    DefaultNudge : 1
}

export const PlusMinusReducer: Redux.Reducer<PlusMinusState> = (state: PlusMinusState = initialPlusMinusState, action: Redux.Action): PlusMinusState => {
    switch (action.type) {
        case PLUSMINUS_SET_DEFAULT_NUDGE:
            return Object.assign({}, state, { DefaultNudge: (<PlusMinusSetDefaultNudgeAction>action).value })
        default:
            return state
    }
}