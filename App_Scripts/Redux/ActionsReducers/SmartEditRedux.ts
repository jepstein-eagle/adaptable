import { SmartEditState } from './Interface/IState';
import { MathOperation } from '../../Core/Enums';
import * as Redux from 'redux'
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';

export const SMARTEDIT_APPLY = 'SMARTEDIT_APPLY';
export const SMARTEDIT_CHANGE_VALUE = 'SMARTEDIT_CHANGE_VALUE';
export const SMARTEDIT_CHANGE_OPERATION = 'SMARTEDIT_CHANGE_OPERATION';
export const SMARTEDIT_CHECK_CELL_SELECTION = 'SMARTEDIT_CHECK_CELL_SELECTION';
export const SMARTEDIT_FETCH_PREVIEW = 'SMARTEDIT_FETCH_PREVIEW';

export interface SmartEditApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean
}

export interface SmartEditChangeValueAction extends Redux.Action {
    value: number
}

export interface SmartEditChangeOperationAction extends Redux.Action {
    MathOperation: MathOperation
}

export interface SmartEditCheckCellSelectionAction extends Redux.Action {
}

export interface SmartEditFetchPreviewAction extends Redux.Action {
}

export interface SmartEditSetPreviewAction extends Redux.Action {
    PreviewInfo: IPreviewInfo
}

export const SmartEditApply = (bypassCellValidationWarnings: boolean): SmartEditApplyAction => ({
    type: SMARTEDIT_APPLY,
    bypassCellValidationWarnings
})

export const SmartEditChangeValue = (value: number): SmartEditChangeValueAction => ({
    type: SMARTEDIT_CHANGE_VALUE,
    value
})

export const SmartEditChangeOperation = (MathOperation: MathOperation): SmartEditChangeOperationAction => ({
    type: SMARTEDIT_CHANGE_OPERATION,
    MathOperation
})

export const SmartEditCheckCellSelection = (): SmartEditCheckCellSelectionAction => ({
    type: SMARTEDIT_CHECK_CELL_SELECTION
})




const initialSmartEditState: SmartEditState = {
    SmartEditValue: 1,
    MathOperation: MathOperation.Add,
 }

export const SmartEditReducer: Redux.Reducer<SmartEditState> = (state: SmartEditState = initialSmartEditState, action: Redux.Action): SmartEditState => {
    switch (action.type) {
        case SMARTEDIT_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { PreviewInfo: null })
        case SMARTEDIT_CHANGE_VALUE:
            return Object.assign({}, state, { SmartEditValue: (<SmartEditChangeValueAction>action).value })
        case SMARTEDIT_CHANGE_OPERATION:
            return Object.assign({}, state, { MathOperation: (<SmartEditChangeOperationAction>action).MathOperation })
        case SMARTEDIT_CHECK_CELL_SELECTION:
            return state
         default:
            return state
    }
}