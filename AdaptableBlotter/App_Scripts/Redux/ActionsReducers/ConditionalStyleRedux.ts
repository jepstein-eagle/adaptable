import { ConditionalStyleState } from './Interface/IState';
import { IConditionalStyleCondition, IStyle } from '../../Core/Interface/IConditionalStyleStrategy';
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ConditionalStyleScope, FontWeight, FontStyle, FontSize } from '../../Core/Enums';
import { Helper } from '../../Core/Helper';
import * as Redux from 'redux'

export const CONDITIONAL_STYLE_ADD_UPDATE = 'CONDITIONAL_STYLE_ADD_UPDATE';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddUpdateAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition
}

export const ConditionalStyleAddUpdate = (conditionalStyleCondition: IConditionalStyleCondition): ConditionalStyleAddUpdateAction => ({
    type: CONDITIONAL_STYLE_ADD_UPDATE,
    conditionalStyleCondition
})

export interface ConditionalStyleDeleteAction extends Redux.Action {
    conditionalStyleCondition: IConditionalStyleCondition
}

export const ConditionalStyleDelete = (conditionalStyleCondition: IConditionalStyleCondition): ConditionalStyleDeleteAction => ({
    type: CONDITIONAL_STYLE_DELETE,
    conditionalStyleCondition
})

const initialCalendarState: ConditionalStyleState = {
    ConditionalStyleConditions: []
}

export const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState> = (state: ConditionalStyleState = initialCalendarState, action: Redux.Action): ConditionalStyleState => {
    let index: number;
    let conditions: IConditionalStyleCondition[]

    switch (action.type) {
        case CONDITIONAL_STYLE_ADD_UPDATE:
            let actionTypedAddUpdate = (<ConditionalStyleAddUpdateAction>action)
            conditions = [].concat(state.ConditionalStyleConditions)

            index = conditions.findIndex(i => i.Uid == actionTypedAddUpdate.conditionalStyleCondition.Uid)
            if (index != -1) {  // it exists
                actionTypedAddUpdate.conditionalStyleCondition.Uid = Helper.generateUid();
                conditions[index] = actionTypedAddUpdate.conditionalStyleCondition
            } else {
                conditions.push(actionTypedAddUpdate.conditionalStyleCondition)
            }
            return Object.assign({}, state, { ConditionalStyleConditions: conditions })
        case CONDITIONAL_STYLE_DELETE:
            let actionTypedDelete = (<ConditionalStyleDeleteAction>action)
            conditions = [].concat(state.ConditionalStyleConditions)
            index = conditions.findIndex(i => i.Uid == actionTypedDelete.conditionalStyleCondition.Uid)
            conditions.splice(index, 1);
            return Object.assign({}, state, { ConditionalStyleConditions: conditions })
        default:
            return state
    }
}
