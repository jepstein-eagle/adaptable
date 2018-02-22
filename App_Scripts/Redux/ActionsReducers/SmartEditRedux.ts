import { SmartEditState } from './Interface/IState';
import { ISmartEditPreview } from '../../Strategy/Interface/ISmartEditStrategy';
import { MathOperation } from '../../Core/Enums';
import * as Redux from 'redux'

export const SMARTEDIT_APPLY = 'SMARTEDIT_APPLY';
export const SMARTEDIT_CHANGE_VALUE = 'SMARTEDIT_CHANGE_VALUE';
export const SMARTEDIT_CHANGE_OPERATION = 'SMARTEDIT_CHANGE_OPERATION';
export const SMARTEDIT_CHECK_CELL_SELECTION = 'SMARTEDIT_CHECK_CELL_SELECTION';
export const SMARTEDIT_FETCH_PREVIEW = 'SMARTEDIT_FETCH_PREVIEW';
export const SMARTEDIT_SET_PREVIEW = 'SMARTEDIT_SET_PREVIEW';

export interface SmartEditApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean
}

export interface SmartEditChangeValueAction extends Redux.Action {
    value: string
}

export interface SmartEditChangeOperationAction extends Redux.Action {
    SmartEditOperation: MathOperation
}

export interface SmartEditCheckCellSelectionAction extends Redux.Action {
}

export interface SmartEditFetchPreviewAction extends Redux.Action {
}

export interface SmartEditSetPreviewAction extends Redux.Action {
    Preview: ISmartEditPreview
}

export const SmartEditApply = (bypassCellValidationWarnings: boolean): SmartEditApplyAction => ({
    type: SMARTEDIT_APPLY,
    bypassCellValidationWarnings
})

export const SmartEditChangeValue = (value: string): SmartEditChangeValueAction => ({
    type: SMARTEDIT_CHANGE_VALUE,
    value
})

export const SmartEditChangeOperation = (SmartEditOperation: MathOperation): SmartEditChangeOperationAction => ({
    type: SMARTEDIT_CHANGE_OPERATION,
    SmartEditOperation
})

export const SmartEditCheckCellSelection = (): SmartEditCheckCellSelectionAction => ({
    type: SMARTEDIT_CHECK_CELL_SELECTION
})

export const SmartEditFetchPreview = (): SmartEditFetchPreviewAction => ({
    type: SMARTEDIT_FETCH_PREVIEW
})

export const SmartEditSetPreview = (Preview: ISmartEditPreview): SmartEditSetPreviewAction => ({
    type: SMARTEDIT_SET_PREVIEW,
    Preview
})

const initialSmartEditState: SmartEditState = {
    SmartEditValue: "1",
    SmartEditOperation: MathOperation.Add,
    Preview: null
}

export const SmartEditReducer: Redux.Reducer<SmartEditState> = (state: SmartEditState = initialSmartEditState, action: Redux.Action): SmartEditState => {
    switch (action.type) {
        case SMARTEDIT_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { Preview: null })
        case SMARTEDIT_CHANGE_VALUE:
            return Object.assign({}, state, { SmartEditValue: (<SmartEditChangeValueAction>action).value })
        case SMARTEDIT_CHANGE_OPERATION:
            return Object.assign({}, state, { SmartEditOperation: (<SmartEditChangeOperationAction>action).SmartEditOperation })
        case SMARTEDIT_FETCH_PREVIEW:
            return state
        case SMARTEDIT_CHECK_CELL_SELECTION:
            return state
        case SMARTEDIT_SET_PREVIEW:
            return Object.assign({}, state, { Preview: (<SmartEditSetPreviewAction>action).Preview })
        default:
            return state
    }
}