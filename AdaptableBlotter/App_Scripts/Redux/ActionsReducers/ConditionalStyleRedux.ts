/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import * as React from 'react';
import { ConditionalStyleState } from './Interface/IState';
import { IConditionalStyleCondition } from '../../Core/Interface/IConditionalStyleStrategy';
import { ExpressionString } from '../../Core/Expression/ExpressionString';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ConditionalStyleScope } from '../../Core/Enums';


export const CONDITIONAL_STYLE_ADD_OR_UPDATE = 'CONDITIONAL_STYLE_ADD_OR_UPDATE';
export const CONDITIONAL_STYLE_EDIT_COLUMN = 'CONDITIONAL_STYLE_EDIT_COLUMN';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddOrUpdateAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition,
    index: number
}

export const AddOrUpdateConditionalStyle = (conditionalStyleCondition: IConditionalStyleCondition, index: number): ConditionalStyleAddOrUpdateAction => ({
    type: CONDITIONAL_STYLE_ADD_OR_UPDATE,
    conditionalStyleCondition,
    index,
})

export interface ConditionalStyleEditColumnAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition,
    columnId: string
    index: number
}

export const EditColumnConditionalStyle = (conditionalStyleCondition: IConditionalStyleCondition, columnId: string, index: number): ConditionalStyleEditColumnAction => ({
    type: CONDITIONAL_STYLE_EDIT_COLUMN,
    conditionalStyleCondition,
    columnId,
    index,
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
            if (actionTyped.index == -1) {
                newCollection.push(actionTyped.conditionalStyleCondition)
            }
            else {
                newCollection[actionTyped.index] = actionTyped.conditionalStyleCondition
            }
            return Object.assign({}, state, { ConditionalStyleConditions: newCollection })
        case CONDITIONAL_STYLE_EDIT_COLUMN:
            let actionTypedColumnAction = (<ConditionalStyleEditColumnAction>action)
            let condition = actionTypedColumnAction.conditionalStyleCondition;
            let newCollection2: IConditionalStyleCondition[] = [].concat(state.ConditionalStyleConditions)
            newCollection2[actionTypedColumnAction.index] = Object.assign({}, condition, { ColumnId: actionTypedColumnAction.columnId })
            return Object.assign({}, state, { ConditionalStyleConditions: newCollection2 })



        case CONDITIONAL_STYLE_DELETE:
            let newCol: IConditionalStyleCondition[] = [].concat(state.ConditionalStyleConditions)
            newCol.splice((<ConditionalStyleDeleteAction>action).Index, 1)
            return Object.assign({}, state, { ConditionalStyleConditions: newCol })
        default:
            return state
    }
}