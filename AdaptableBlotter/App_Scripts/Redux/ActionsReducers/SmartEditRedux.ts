/// <reference path="../../../typings/index.d.ts" />
/// <reference path="./Interface/IState.d.ts" />

import * as Redux from 'redux';

export const SMARTEDIT_APPLY = 'SMARTEDIT_APPLY';
export const SMARTEDIT_SETVALUE = 'SMARTEDIT_SETVALUE';
export const SMARTEDIT_SETOPERATION = 'SMARTEDIT_SETOPERATION';
export const SMARTEDIT_FETCHPREVIEW = 'SMARTEDIT_FETCHPREVIEW';
const SMARTEDIT_SETPREVIEW = 'SMARTEDIT_SETPREVIEW';

export interface ApplySmarteditAction extends Redux.Action {

}

export interface SmartEditSetValueAction extends Redux.Action {
    value: number
}

export interface SmartEditSetOperationAction extends Redux.Action {
    SmartEditOperation: SmartEditOperation
}

export interface SmartEditFetchPreviewAction extends Redux.Action {
}

export interface SmartEditSetPreviewAction extends Redux.Action {
    Preview: ISmartEditPreview
}


export const ApplySmartedit = (): ApplySmarteditAction => ({
    type: SMARTEDIT_APPLY
})

export const SmartEditSetValue = (value: number): SmartEditSetValueAction => ({
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
    SmartEditValue: 1,
    SmartEditOperation: SmartEditOperation.Sum,
    Preview: null
}

export const SmartEditReducer: Redux.Reducer<SmartEditState> = (state: SmartEditState = initialSmartEditState, action: Redux.Action): SmartEditState => {
    switch (action.type) {
        case SMARTEDIT_APPLY:
            return state
        case SMARTEDIT_SETVALUE:
            //first {} is important as we need to clone the state and not amend it
            return Object.assign({}, state, { SmartEditValue: (<SmartEditSetValueAction>action).value })
        case SMARTEDIT_SETOPERATION:
            //first {} is important as we need to clone the state and not amend it
            return Object.assign({}, state, { SmartEditOperation: (<SmartEditSetOperationAction>action).SmartEditOperation })
        case SMARTEDIT_FETCHPREVIEW:
            //this is handled by Redux Middleware as it requires API calls
            return state
        case SMARTEDIT_SETPREVIEW:
            //first {} is important as we need to clone the state and not amend it
            return Object.assign({}, state, { Preview: (<SmartEditSetPreviewAction>action).Preview })
        default:
            return state
    }
}