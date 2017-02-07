/// <reference path="../../../typings/index.d.ts" />
import { SmartEditState } from './Interface/IState';
import { ISmartEditStrategy, ISmartEditPreview } from '../../Core/Interface/ISmartEditStrategy';
import { SmartEditOperation } from '../../Core/Enums';

export const SMARTEDIT_APPLY = 'SMARTEDIT_APPLY';
export const SMARTEDIT_SETVALUE = 'SMARTEDIT_SETVALUE';
export const SMARTEDIT_SETOPERATION = 'SMARTEDIT_SETOPERATION';
export const SMARTEDIT_FETCHPREVIEW = 'SMARTEDIT_FETCHPREVIEW';
export const SMARTEDIT_SETPREVIEW = 'SMARTEDIT_SETPREVIEW';

export interface ApplySmarteditAction extends Redux.Action {
    bypassCellValidationWarnings: boolean
}

export interface SmartEditSetValueAction extends Redux.Action {
    value: string
}

export interface SmartEditSetOperationAction extends Redux.Action {
    SmartEditOperation: SmartEditOperation
}

export interface SmartEditFetchPreviewAction extends Redux.Action {
}

export interface SmartEditSetPreviewAction extends Redux.Action {
    Preview: ISmartEditPreview
}

export const ApplySmartedit = (bypassCellValidationWarnings: boolean): ApplySmarteditAction => ({
    type: SMARTEDIT_APPLY,
    bypassCellValidationWarnings
})

export const SmartEditSetValue = (value: string): SmartEditSetValueAction => ({
    type: SMARTEDIT_SETVALUE,
    value
})

export const SmartEditSetOperation = (SmartEditOperation: SmartEditOperation): SmartEditSetOperationAction => ({
    type: SMARTEDIT_SETOPERATION,
    SmartEditOperation
})

export const SmartEditFetchPreview = (): SmartEditFetchPreviewAction => ({
    type: SMARTEDIT_FETCHPREVIEW
})

export const SmartEditSetPreview = (Preview: ISmartEditPreview): SmartEditSetPreviewAction => ({
    type: SMARTEDIT_SETPREVIEW,
    Preview
})

const initialSmartEditState: SmartEditState = {
    SmartEditValue: "1",
    SmartEditOperation: SmartEditOperation.Sum,
    Preview: null
}

export const SmartEditReducer: Redux.Reducer<SmartEditState> = (state: SmartEditState = initialSmartEditState, action: Redux.Action): SmartEditState => {
    switch (action.type) {
        case SMARTEDIT_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { Preview: null })
        case SMARTEDIT_SETVALUE:
            return Object.assign({}, state, { SmartEditValue: (<SmartEditSetValueAction>action).value })
        case SMARTEDIT_SETOPERATION:
            return Object.assign({}, state, { SmartEditOperation: (<SmartEditSetOperationAction>action).SmartEditOperation })
        case SMARTEDIT_FETCHPREVIEW:
            return state
        case SMARTEDIT_SETPREVIEW:
            return Object.assign({}, state, { Preview: (<SmartEditSetPreviewAction>action).Preview })
        default:
            return state
    }
}
