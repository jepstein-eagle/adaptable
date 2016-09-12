/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import {PlusMinusState} from './Interface/IState';

export const PLUSMINUS_SET_DEFAULT_NUDGE = 'PLUSMINUS_SET_DEFAULT_NUDGE';
export const PLUSMINUS_SET_COLUMNS_DEFAULT_NUDGE = 'PLUSMINUS_SET_COLUMNS_DEFAULT_NUDGE';

export interface PlusMinusSetDefaultNudgeAction extends Redux.Action {
    value: number
}

export interface PlusMinusSetColumnsDefaultNudgeAction extends Redux.Action {
    ColumnsDefaultNudge: { ColumnId: string, DefaultNudge: number }[]
}

export const PlusMinusSetDefaultNudge = (value: number): PlusMinusSetDefaultNudgeAction => ({
    type: PLUSMINUS_SET_DEFAULT_NUDGE,
    value
})

export const PlusMinusSetColumnsDefaultNudge = (ColumnsDefaultNudge: { ColumnId: string, DefaultNudge: number }[]): PlusMinusSetColumnsDefaultNudgeAction => ({
    type: PLUSMINUS_SET_COLUMNS_DEFAULT_NUDGE,
    ColumnsDefaultNudge
})

const initialPlusMinusState: PlusMinusState = {
    DefaultNudge: 1,
    ColumnsDefaultNudge: []
}

export const PlusMinusReducer: Redux.Reducer<PlusMinusState> = (state: PlusMinusState = initialPlusMinusState, action: Redux.Action): PlusMinusState => {
    switch (action.type) {
        case PLUSMINUS_SET_DEFAULT_NUDGE:
            return Object.assign({}, state, { DefaultNudge: (<PlusMinusSetDefaultNudgeAction>action).value })
        case PLUSMINUS_SET_COLUMNS_DEFAULT_NUDGE:
            return Object.assign({}, state, { ColumnsDefaultNudge: [].concat((<PlusMinusSetColumnsDefaultNudgeAction>action).ColumnsDefaultNudge) })
        default:
            return state
    }
}