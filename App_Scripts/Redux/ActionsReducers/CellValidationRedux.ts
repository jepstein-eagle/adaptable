import * as Redux from 'redux';
import { CellValidationState } from './Interface/IState'
import { ICellValidationRule } from '../../Core/Interface/ICellValidationStrategy';
import { CellValidationMode } from '../../Core/Enums';

export const CELL_VALIDATION_ADD_UPDATE = 'CELL_VALIDATION_ADD_UPDATE';
export const CELL_VALIDATION_DELETE = 'CELL_VALIDATION_DELETE';
export const CELL_VALIDATION_CHANGE_MODE = 'CELL_VALIDATION_CHANGE_MODE';

export interface CellValidationAddUpdateAction extends Redux.Action {
    Index: number,
    CellValidationRule: ICellValidationRule
}

export interface CellValidationChangeModeAction extends Redux.Action {
    Index: number,
    CellValidationMode: CellValidationMode
}

export interface CellValidationDeleteAction extends Redux.Action {
    Index: number,
}

export const CellValidationChangeMode = (Index: number, CellValidationMode: CellValidationMode): CellValidationChangeModeAction => ({
    type: CELL_VALIDATION_CHANGE_MODE,
    Index,
    CellValidationMode
})

export const CellValidationAddUpdate = (Index: number, CellValidationRule: ICellValidationRule): CellValidationAddUpdateAction => ({
    type: CELL_VALIDATION_ADD_UPDATE,
    Index,
    CellValidationRule
})

export const CellValidationDelete = (Index: number): CellValidationDeleteAction => ({
    type: CELL_VALIDATION_DELETE,
    Index,
})


const initialCellValidationState: CellValidationState = {
    CellValidations: []
}

export const CellValidationReducer: Redux.Reducer<CellValidationState> = (state: CellValidationState = initialCellValidationState, action: Redux.Action): CellValidationState => {
    let CellValidations: ICellValidationRule[]

    switch (action.type) {

        case CELL_VALIDATION_ADD_UPDATE: {
            let actionTyped = (<CellValidationAddUpdateAction>action)
            CellValidations = [].concat(state.CellValidations)
            if (actionTyped.Index == -1) {
                CellValidations.push(actionTyped.CellValidationRule)
            } else {
                CellValidations[actionTyped.Index] = actionTyped.CellValidationRule
            }
            return Object.assign({}, state, { CellValidations: CellValidations })
        }

        case CELL_VALIDATION_DELETE: {
            CellValidations = [].concat(state.CellValidations)
            CellValidations.splice((<CellValidationDeleteAction>action).Index, 1)
            return Object.assign({}, state, { CellValidations: CellValidations })
        }

        case CELL_VALIDATION_CHANGE_MODE: {
            let actionTyped = (<CellValidationChangeModeAction>action)
            CellValidations = [].concat(state.CellValidations)
            let cellValidation = CellValidations[actionTyped.Index]
            CellValidations[actionTyped.Index] = Object.assign({}, cellValidation, { CellValidationMode: actionTyped.CellValidationMode })
            return Object.assign({}, state, { CellValidations: CellValidations })
        }

        default:
            return state
    }
}