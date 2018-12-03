import { ConditionalStyleState } from './Interface/IState';
import * as Redux from 'redux'
import { IConditionalStyle } from '../../api/Interface/IAdaptableBlotterObjects';

export const CONDITIONAL_STYLE_ADD_UPDATE = 'CONDITIONAL_STYLE_ADD_UPDATE';
export const CONDITIONAL_STYLE_DELETE = 'CONDITIONAL_STYLE_DELETE';

export interface ConditionalStyleAddUpdateAction extends Redux.Action {
    Index: number
    conditionalStyle: IConditionalStyle
}

export const ConditionalStyleAddUpdate = (Index: number, conditionalStyle: IConditionalStyle): ConditionalStyleAddUpdateAction => ({
    type: CONDITIONAL_STYLE_ADD_UPDATE,
    Index,
    conditionalStyle
})

export interface ConditionalStyleDeleteAction extends Redux.Action {
    Index: number
    conditionalStyle: IConditionalStyle
}

export const ConditionalStyleDelete = (Index: number,conditionalStyle: IConditionalStyle): ConditionalStyleDeleteAction => ({
    type: CONDITIONAL_STYLE_DELETE,
    Index,
    conditionalStyle
})

const initialConditionalStyleState: ConditionalStyleState = {
    ConditionalStyles: []
}

export const ConditionalStyleReducer: Redux.Reducer<ConditionalStyleState> = (state: ConditionalStyleState = initialConditionalStyleState, action: Redux.Action): ConditionalStyleState => {
    let conditions: IConditionalStyle[]

    switch (action.type) {
        case CONDITIONAL_STYLE_ADD_UPDATE:
            let actionTypedAddUpdate = (<ConditionalStyleAddUpdateAction>action)
            conditions = [].concat(state.ConditionalStyles)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                conditions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.conditionalStyle
            } else {
                conditions.push(actionTypedAddUpdate.conditionalStyle)
            }
            return Object.assign({}, state, { ConditionalStyles: conditions })
        case CONDITIONAL_STYLE_DELETE:
            let actionTypedDelete = (<ConditionalStyleDeleteAction>action)
            conditions = [].concat(state.ConditionalStyles)
            conditions.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { ConditionalStyles: conditions })
        default:
            return state
    }
}
