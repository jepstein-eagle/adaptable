/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { CellValidationState } from './interface/IState'
import { ICellValidationRule } from '../../Core/interface/IEditingRestrictionStrategy';

export const EDITING_RESTRICTION_ADD_OR_UPDATE = 'EDITING_RESTRICTION_ADD_OR_UPDATE';
export const EDITING_RESTRICTION_DELETE = 'EDITING_RESTRICTION_DELETE';


export interface EditingRestrictionAddOrUpdateAction extends Redux.Action {
    Index: number,
    EditingRestriction: ICellValidationRule
}

export interface EditingRestrictionDeleteAction extends Redux.Action {
    Index: number,
}

export const AddEditEditingRestriction = (Index: number, EditingRestriction: ICellValidationRule): EditingRestrictionAddOrUpdateAction => ({
    type: EDITING_RESTRICTION_ADD_OR_UPDATE,
    Index,
    EditingRestriction
})

export const DeleteEditingRestriction = (Index: number): EditingRestrictionDeleteAction => ({
    type: EDITING_RESTRICTION_DELETE,
    Index,
})


const initialEditingRestrictionState: CellValidationState = {
    CellValidations: []
}

export const EditingRestrictionReducer: Redux.Reducer<CellValidationState> = (state: CellValidationState = initialEditingRestrictionState, action: Redux.Action): CellValidationState => {
    let CellValidations: ICellValidationRule[]

    switch (action.type) {

        case EDITING_RESTRICTION_ADD_OR_UPDATE: {
            let actionTyped = (<EditingRestrictionAddOrUpdateAction>action)
            CellValidations = [].concat(state.CellValidations)
            if (actionTyped.Index == -1) {
                CellValidations.push(actionTyped.EditingRestriction)
            } else {
                CellValidations[actionTyped.Index] = actionTyped.EditingRestriction
            }
            return Object.assign({}, state, { CellValidations: CellValidations })
        }

        case EDITING_RESTRICTION_DELETE: {
            CellValidations = [].concat(state.CellValidations)
            CellValidations.splice((<EditingRestrictionDeleteAction>action).Index, 1)
            return Object.assign({}, state, { CellValidations: CellValidations })
        }

        default:
            return state
    }
}