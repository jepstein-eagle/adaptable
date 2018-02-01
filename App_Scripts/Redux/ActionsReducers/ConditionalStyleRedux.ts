import { ConditionalStyleState } from './Interface/IState';
import { IConditionalStyleCondition } from '../../Strategy/Interface/IConditionalStyleStrategy';
import {  IStyle } from '../../Core/Interface/IStyle';
import { Expression } from '../../Core/Expression';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { Helper } from '../../Core/Helpers/Helper';
import * as Redux from 'redux'

export const CONDITIONAL_STYLE_ADD_UPDATE = 'CONDITIONAL_STYLE_ADD_UPDATE';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddUpdateAction extends Redux.Action {
    Index: number
    conditionalStyleCondition: IConditionalStyleCondition
}

export const ConditionalStyleAddUpdate = (Index: number, conditionalStyleCondition: IConditionalStyleCondition): ConditionalStyleAddUpdateAction => ({
    type: CONDITIONAL_STYLE_ADD_UPDATE,
    Index,
    conditionalStyleCondition
})

export interface ConditionalStyleDeleteAction extends Redux.Action {
    Index: number
    conditionalStyleCondition: IConditionalStyleCondition
}

export const ConditionalStyleDelete = (Index: number,conditionalStyleCondition: IConditionalStyleCondition): ConditionalStyleDeleteAction => ({
    type: CONDITIONAL_STYLE_DELETE,
    Index,
    conditionalStyleCondition
})

const initialConditionalStyleState: ConditionalStyleState = {
    ConditionalStyleConditions: []
}

export const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState> = (state: ConditionalStyleState = initialConditionalStyleState, action: Redux.Action): ConditionalStyleState => {
    let conditions: IConditionalStyleCondition[]

    switch (action.type) {
        case CONDITIONAL_STYLE_ADD_UPDATE:
            let actionTypedAddUpdate = (<ConditionalStyleAddUpdateAction>action)
            conditions = [].concat(state.ConditionalStyleConditions)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                conditions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.conditionalStyleCondition
            } else {
                conditions.push(actionTypedAddUpdate.conditionalStyleCondition)
            }
            return Object.assign({}, state, { ConditionalStyleConditions: conditions })
        case CONDITIONAL_STYLE_DELETE:
            let actionTypedDelete = (<ConditionalStyleDeleteAction>action)
            conditions = [].concat(state.ConditionalStyleConditions)
            conditions.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { ConditionalStyleConditions: conditions })
        default:
            return state
    }
}
