/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { EditingRestrictionState } from './interface/IState'
import { IEditingRestriction } from '../../Core/interface/IEditingRestrictionStrategy';

export const EDITING_RESTRICTION_ADD_OR_UPDATE = 'EDITING_RESTRICTION_ADD_OR_UPDATE';
export const EDITING_RESTRICTION_DELETE = 'EDITING_RESTRICTION_DELETE';


export interface EditingRestrictionAddOrUpdateAction extends Redux.Action {
    Index: number,
    EditingRestriction: IEditingRestriction
}

export interface EditingRestrictionDeleteAction extends Redux.Action {
    Index: number,
}

export const AddEditEditingRestriction = (Index: number, EditingRestriction: IEditingRestriction): EditingRestrictionAddOrUpdateAction => ({
    type: EDITING_RESTRICTION_ADD_OR_UPDATE,
    Index,
    EditingRestriction
})

export const DeleteEditingRestriction = (Index: number): EditingRestrictionDeleteAction => ({
    type: EDITING_RESTRICTION_DELETE,
    Index,
})


const initialEditingRestrictionState: EditingRestrictionState = {
    EditingRestrictions: []
}

export const EditingRestrictionReducer: Redux.Reducer<EditingRestrictionState> = (state: EditingRestrictionState = initialEditingRestrictionState, action: Redux.Action): EditingRestrictionState => {
    let EditingRestrictions: IEditingRestriction[]

    switch (action.type) {

        case EDITING_RESTRICTION_ADD_OR_UPDATE: {
            let actionTyped = (<EditingRestrictionAddOrUpdateAction>action)
            EditingRestrictions = [].concat(state.EditingRestrictions)
            if (actionTyped.Index == -1) {
                EditingRestrictions.push(actionTyped.EditingRestriction)
            } else {
                EditingRestrictions[actionTyped.Index] = actionTyped.EditingRestriction
            }
            return Object.assign({}, state, { EditingRestrictions: EditingRestrictions })
        }

        case EDITING_RESTRICTION_DELETE: {
            EditingRestrictions = [].concat(state.EditingRestrictions)
            EditingRestrictions.splice((<EditingRestrictionDeleteAction>action).Index, 1)
            return Object.assign({}, state, { EditingRestrictions: EditingRestrictions })
        }

        default:
            return state
    }
}