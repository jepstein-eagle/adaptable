/// <reference path="../../../typings/index.d.ts" />

import * as Redux from 'redux';
import { CellValidationState } from './interface/IState'
import { ICellValidationRule } from '../../Core/interface/ICellValidationStrategy';

export const CELL_VALIDATION_ADD_OR_UPDATE = 'CELL_VALIDATION_ADD_OR_UPDATE';
export const CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';


export interface CellValidationRuleAddOrUpdateAction extends Redux.Action {
    Index: number,
    CellValidationRule: ICellValidationRule
}

export interface CellValidationRuleDeleteAction extends Redux.Action {
    Index: number,
}

export const AddEditCellValidationRule = (Index: number, CellValidationRule: ICellValidationRule): CellValidationRuleAddOrUpdateAction => ({
    type: CELL_VALIDATION_ADD_OR_UPDATE,
    Index,
    CellValidationRule
})

export const DeleteCellValidationRule = (Index: number): CellValidationRuleDeleteAction => ({
    type: CELL_VALIDATION_DELETE,
    Index,
})


const initialCellValidationState: CellValidationState = {
    CellValidationRules: []
}

export const CellValidationReducer: Redux.Reducer<CellValidationState> = (state: CellValidationState = initialCellValidationState, action: Redux.Action): CellValidationState => {
    let cellValidationRules: ICellValidationRule[]

    switch (action.type) {

        case CELL_VALIDATION_ADD_OR_UPDATE: {
            let actionTyped = (<CellValidationRuleAddOrUpdateAction>action)
            cellValidationRules = [].concat(state.CellValidationRules)
            if (actionTyped.Index == -1) {
                cellValidationRules.push(actionTyped.CellValidationRule)
            } else {
                cellValidationRules[actionTyped.Index] = actionTyped.CellValidationRule
            }
            return Object.assign({}, state, { CellValidationRules: cellValidationRules })
        }

        case CELL_VALIDATION_DELETE: {
            cellValidationRules = [].concat(state.CellValidationRules)
            cellValidationRules.splice((<CellValidationRuleDeleteAction>action).Index, 1)
            return Object.assign({}, state, { CellValidationRules: cellValidationRules })
        }

        default:
            return state
    }
}