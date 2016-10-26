/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import * as React from 'react';
import { PlusMinusState } from './Interface/IState';
import { IPlusMinusCondition } from '../../Core/interface/IPlusMinusStrategy';
import { IExpression } from '../../Core/interface/IExpression';

import { ExpressionString } from '../../Core/Expression/ExpressionString';

export const PLUSMINUS_SET_DEFAULT_NUDGE = 'PLUSMINUS_SET_DEFAULT_NUDGE';
export const PLUSMINUS_ADD_OR_UPDATE_COLUMNS_DEFAULT_NUDGE = 'PLUSMINUS_ADD_OR_UPDATE_COLUMNS_DEFAULT_NUDGE';
export const PLUSMINUS_EDIT_COLUMNS_DEFAULT_NUDGE = 'PLUSMINUS_EDIT_COLUMNS_DEFAULT_NUDGE';
export const PLUSMINUS_DELETE_COLUMNS_DEFAULT_NUDGE = 'PLUSMINUS_DELETE_COLUMNS_DEFAULT_NUDGE';

export interface PlusMinusSetDefaultNudgeAction extends Redux.Action {
    value: number
}

export interface PlusMinusSetColumnsDefaultNudgeAction extends Redux.Action {
    ColumnsDefaultNudge: { ColumnId: string, DefaultNudge: number }[]
}

export interface PlusMinusAddOrUpdateColumnsDefaultNudgeAction extends Redux.Action {
    Index: number,
    ColumnsDefaultNudge: IPlusMinusCondition
}

export interface PlusMinusEditColumnsDefaultNudgeAction extends Redux.Action {
    Index: number,
    ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }
}

export interface PlusMinusDeleteColumnsDefaultNudgeAction extends Redux.Action {
    Index: number
}

export const PlusMinusSetDefaultNudge = (value: number): PlusMinusSetDefaultNudgeAction => ({
    type: PLUSMINUS_SET_DEFAULT_NUDGE,
    value
})

export const PlusMinusAddOrUpdateColumnsDefaultNudge = (Index: number, ColumnsDefaultNudge: IPlusMinusCondition): PlusMinusAddOrUpdateColumnsDefaultNudgeAction => ({
    type: PLUSMINUS_ADD_OR_UPDATE_COLUMNS_DEFAULT_NUDGE,
    Index,
    ColumnsDefaultNudge
})

export const PlusMinusEditColumnsDefaultNudge = (Index: number, ColumnDefaultNudge: { ColumnId: string, DefaultNudge: number }): PlusMinusEditColumnsDefaultNudgeAction => ({
    type: PLUSMINUS_EDIT_COLUMNS_DEFAULT_NUDGE,
    Index,
    ColumnDefaultNudge
})

export const PlusMinusDeleteColumnsDefaultNudge = (Index: number): PlusMinusDeleteColumnsDefaultNudgeAction => ({
    type: PLUSMINUS_DELETE_COLUMNS_DEFAULT_NUDGE,
    Index
})

const initialPlusMinusState: PlusMinusState = {
    DefaultNudge: 1,
    ColumnsDefaultNudge: []
}

export const PlusMinusReducer: Redux.Reducer<PlusMinusState> = (state: PlusMinusState = initialPlusMinusState, action: Redux.Action): PlusMinusState => {
    switch (action.type) {
        case PLUSMINUS_SET_DEFAULT_NUDGE:
            return Object.assign({}, state, { DefaultNudge: (<PlusMinusSetDefaultNudgeAction>action).value })
        case PLUSMINUS_ADD_OR_UPDATE_COLUMNS_DEFAULT_NUDGE: {
            let actionTyped = (<PlusMinusAddOrUpdateColumnsDefaultNudgeAction>action)
            let newCol: IPlusMinusCondition[] = [].concat(state.ColumnsDefaultNudge)
            if (actionTyped.Index == -1) {
                newCol.push(actionTyped.ColumnsDefaultNudge)
            }
            else {
                newCol[actionTyped.Index] = actionTyped.ColumnsDefaultNudge
            }
            return Object.assign({}, state, { ColumnsDefaultNudge: newCol })
        }
        case PLUSMINUS_EDIT_COLUMNS_DEFAULT_NUDGE: {
            let newCol: IPlusMinusCondition[] = [].concat(state.ColumnsDefaultNudge)
            let actionTyped = (<PlusMinusEditColumnsDefaultNudgeAction>action)
            let oldCondition = newCol[actionTyped.Index]
            newCol[actionTyped.Index] = Object.assign({}, oldCondition, { ColumnId: actionTyped.ColumnDefaultNudge.ColumnId, DefaultNudge: actionTyped.ColumnDefaultNudge.DefaultNudge })
            return Object.assign({}, state, { ColumnsDefaultNudge: newCol })
        }
        case PLUSMINUS_DELETE_COLUMNS_DEFAULT_NUDGE: {
            let newCol: IPlusMinusCondition[] = [].concat(state.ColumnsDefaultNudge)
            newCol.splice((<PlusMinusDeleteColumnsDefaultNudgeAction>action).Index, 1)
            return Object.assign({}, state, { ColumnsDefaultNudge: newCol })
        }
        default:
            return state
    }
}