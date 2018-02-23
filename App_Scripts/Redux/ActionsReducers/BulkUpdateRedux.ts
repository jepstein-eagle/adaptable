import { BulkUpdateState } from './Interface/IState';
import { MathOperation } from '../../Core/Enums';
import * as Redux from 'redux'
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';

export const BulkUpdate_APPLY = 'BulkUpdate_APPLY';
export const BulkUpdate_CHANGE_VALUE = 'BulkUpdate_CHANGE_VALUE';
export const BulkUpdate_CHECK_CELL_SELECTION = 'BulkUpdate_CHECK_CELL_SELECTION';
export const BulkUpdate_FETCH_PREVIEW = 'BulkUpdate_FETCH_PREVIEW';
export const BulkUpdate_SET_PREVIEW = 'BulkUpdate_SET_PREVIEW';

export interface BulkUpdateApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean
}

export interface BulkUpdateChangeValueAction extends Redux.Action {
    value: string
}

export interface BulkUpdateCheckCellSelectionAction extends Redux.Action {
}

export interface BulkUpdateFetchPreviewAction extends Redux.Action {
}

export interface BulkUpdateSetPreviewAction extends Redux.Action {
    PreviewInfo: IPreviewInfo
}

export const BulkUpdateApply = (bypassCellValidationWarnings: boolean): BulkUpdateApplyAction => ({
    type: BulkUpdate_APPLY,
    bypassCellValidationWarnings
})

export const BulkUpdateChangeValue = (value: string): BulkUpdateChangeValueAction => ({
    type: BulkUpdate_CHANGE_VALUE,
    value
})


export const BulkUpdateCheckCellSelection = (): BulkUpdateCheckCellSelectionAction => ({
    type: BulkUpdate_CHECK_CELL_SELECTION
})

export const BulkUpdateFetchPreview = (): BulkUpdateFetchPreviewAction => ({
    type: BulkUpdate_FETCH_PREVIEW
})

export const BulkUpdateSetPreview = (PreviewInfo: IPreviewInfo): BulkUpdateSetPreviewAction => ({
    type: BulkUpdate_SET_PREVIEW,
    PreviewInfo
})

const initialBulkUpdateState: BulkUpdateState = {
    BulkUpdateValue: "",
    PreviewInfo: null
}

export const BulkUpdateReducer: Redux.Reducer<BulkUpdateState> = (state: BulkUpdateState = initialBulkUpdateState, action: Redux.Action): BulkUpdateState => {
    switch (action.type) {
        case BulkUpdate_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { PreviewInfo: null })
        case BulkUpdate_CHANGE_VALUE:
            return Object.assign({}, state, { BulkUpdateValue: (<BulkUpdateChangeValueAction>action).value })
        case BulkUpdate_FETCH_PREVIEW:
            return state
        case BulkUpdate_CHECK_CELL_SELECTION:
            return state
        case BulkUpdate_SET_PREVIEW:
            return Object.assign({}, state, { PreviewInfo: (<BulkUpdateSetPreviewAction>action).PreviewInfo })
        default:
            return state
    }
}