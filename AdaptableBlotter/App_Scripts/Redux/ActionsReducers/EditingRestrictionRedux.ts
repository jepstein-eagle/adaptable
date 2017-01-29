/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { EditingRestrictionState } from './interface/IState'
import { IEditingRestrictionRule } from '../../Core/interface/IEditingRestrictionStrategy';

export const CELL_VALIDATION_ADD_OR_UPDATE = 'CELL_VALIDATION_ADD_OR_UPDATE';
export const CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';


export interface EditingRestrictionRuleAddOrUpdateAction extends Redux.Action {
    Index: number,
    EditingRestrictionRule: IEditingRestrictionRule
}

export interface EditingRestrictionRuleDeleteAction extends Redux.Action {
    Index: number,
}

export const AddEditEditingRestrictionRule = (Index: number, EditingRestrictionRule: IEditingRestrictionRule): EditingRestrictionRuleAddOrUpdateAction => ({
    type: CELL_VALIDATION_ADD_OR_UPDATE,
    Index,
    EditingRestrictionRule
})

export const DeleteEditingRestrictionRule = (Index: number): EditingRestrictionRuleDeleteAction => ({
    type: CELL_VALIDATION_DELETE,
    Index,
})


const initialEditingRestrictionState: EditingRestrictionState = {
    EditingRestrictions: []
}

export const EditingRestrictionReducer: Redux.Reducer<EditingRestrictionState> = (state: EditingRestrictionState = initialEditingRestrictionState, action: Redux.Action): EditingRestrictionState => {
    let EditingRestrictionRules: IEditingRestrictionRule[]

    switch (action.type) {

        case CELL_VALIDATION_ADD_OR_UPDATE: {
            let actionTyped = (<EditingRestrictionRuleAddOrUpdateAction>action)
            EditingRestrictionRules = [].concat(state.EditingRestrictions)
            if (actionTyped.Index == -1) {
                EditingRestrictionRules.push(actionTyped.EditingRestrictionRule)
            } else {
                EditingRestrictionRules[actionTyped.Index] = actionTyped.EditingRestrictionRule
            }
            return Object.assign({}, state, { EditingRestrictionRules: EditingRestrictionRules })
        }

        case CELL_VALIDATION_DELETE: {
            EditingRestrictionRules = [].concat(state.EditingRestrictions)
            EditingRestrictionRules.splice((<EditingRestrictionRuleDeleteAction>action).Index, 1)
            return Object.assign({}, state, { EditingRestrictionRules: EditingRestrictionRules })
        }

        default:
            return state
    }
}