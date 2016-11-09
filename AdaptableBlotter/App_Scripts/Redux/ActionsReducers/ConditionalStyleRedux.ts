/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import * as React from 'react';
import { ConditionalStyleState } from './Interface/IState';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { ExpressionString } from '../../Core/Expression/ExpressionString';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ConditionalStyleScope } from '../../Core/Enums';


export const CONDITIONAL_STYLE_ADD_OR_UPDATE = 'CONDITIONAL_STYLE_ADD_OR_UPDATE';
export const CONDITIONAL_STYLE_EDIT = 'CONDITIONAL_STYLE_EDIT';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddOrUpdateAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition,
    Index: number
}

export const AddOrUpdateConditionalStyle = (conditionalStyleCondition: IConditionalStyleCondition, Index: number): ConditionalStyleAddOrUpdateAction => ({
    type: CONDITIONAL_STYLE_ADD_OR_UPDATE,
    conditionalStyleCondition,
    Index,
})

export interface ConditionalStyleDeleteAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition
    Index: number
}

export const DeleteConditionalStyle = (conditionalStyleCondition: IConditionalStyleCondition, Index: number): ConditionalStyleDeleteAction => ({
    type: CONDITIONAL_STYLE_DELETE,
    conditionalStyleCondition,
    Index
})

const initialCalendarState: ConditionalStyleState = {
    ConditionalStyleConditions: []
      //  { ColumnId: "bid", StyleName: "Red", ConditionalStyleScope: ConditionalStyleScope.Column, Expression: ExpressionHelper.CreateEmptyExpression() },
      //  { ColumnId: "ask", StyleName: "Blue", ConditionalStyleScope: ConditionalStyleScope.Row, Expression: ExpressionHelper.CreateEmptyExpression() }     ]
}

export const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState> = (state: ConditionalStyleState = initialCalendarState, action: Redux.Action): ConditionalStyleState => {
    switch (action.type) {
        case CONDITIONAL_STYLE_ADD_OR_UPDATE:
            let actionTyped = (<ConditionalStyleAddOrUpdateAction>action)
            let newCollection: IConditionalStyleCondition[] = [].concat(state.ConditionalStyleConditions)
            if (actionTyped.Index == -1) {
                newCollection.push(actionTyped.conditionalStyleCondition)
            }
            else {
                newCollection[actionTyped.Index] = actionTyped.conditionalStyleCondition
            }
            return Object.assign({}, state, { ConditionalStyleConditions: newCollection })
        case CONDITIONAL_STYLE_DELETE:
            let newCol: IConditionalStyleCondition[] = [].concat(state.ConditionalStyleConditions)
            newCol.splice((<ConditionalStyleDeleteAction>action).Index, 1)
            return Object.assign({}, state, { ConditionalStyleConditions: newCol })
        default:
            return state
    }
}