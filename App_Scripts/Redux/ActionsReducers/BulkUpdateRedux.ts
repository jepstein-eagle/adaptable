import { BulkUpdateState } from './Interface/IState';
import * as Redux from 'redux'
import { IPreviewInfo } from '../../Core/Interface/IPreviewResult';

export const BULK_UPDATE_APPLY = 'BULK_UPDATE_APPLY';
export const BULK_UPDATE_CHANGE_VALUE = 'BULK_UPDATE_CHANGE_VALUE';
export const BULK_UPDATE_CHECK_CELL_SELECTION = 'BULK_UPDATE_CHECK_CELL_SELECTION';
export const BULK_UPDATE_SET_VALID_SELECTION = 'BULK_UPDATE_SET_VALID_SELECTION';
export const BULK_UPDATE_SET_PREVIEW = 'BULK_UPDATE_SET_PREVIEW';

export interface BulkUpdateApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean
}

export interface BulkUpdateChangeValueAction extends Redux.Action {
    value: string
}

export interface BulkUpdateCheckCellSelectionAction extends Redux.Action {
}

export interface BulkUpdateSetPreviewAction extends Redux.Action {
    PreviewInfo: IPreviewInfo
}

export interface BulkUpdateSetValidSelectionAction extends Redux.Action {
    IsValidSelection: boolean
}

export const BulkUpdateApply = (bypassCellValidationWarnings: boolean): BulkUpdateApplyAction => ({
    type: BULK_UPDATE_APPLY,
    bypassCellValidationWarnings
})

export const BulkUpdateChangeValue = (value: string): BulkUpdateChangeValueAction => ({
    type: BULK_UPDATE_CHANGE_VALUE,
    value
})


export const BulkUpdateCheckCellSelection = (): BulkUpdateCheckCellSelectionAction => ({
    type: BULK_UPDATE_CHECK_CELL_SELECTION
})

export const BulkUpdateSetValidSelection = (IsValidSelection: boolean): BulkUpdateSetValidSelectionAction => ({
    type: BULK_UPDATE_SET_VALID_SELECTION,
    IsValidSelection
})

export const BulkUpdateSetPreview = (PreviewInfo: IPreviewInfo): BulkUpdateSetPreviewAction => ({
    type: BULK_UPDATE_SET_PREVIEW,
    PreviewInfo
})

const initialBulkUpdateState: BulkUpdateState = {
    BulkUpdateValue: "",
    IsValidSelection: false,
    PreviewInfo: null
}

export const BulkUpdateReducer: Redux.Reducer<BulkUpdateState> = (state: BulkUpdateState = initialBulkUpdateState, action: Redux.Action): BulkUpdateState => {
    switch (action.type) {
        case BULK_UPDATE_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { PreviewInfo: null })
        case BULK_UPDATE_CHANGE_VALUE:
            return Object.assign({}, state, { BulkUpdateValue: (<BulkUpdateChangeValueAction>action).value })
        case BULK_UPDATE_SET_VALID_SELECTION:
            return Object.assign({}, state, { IsValidSelection: (<BulkUpdateSetValidSelectionAction>action).IsValidSelection })
        case BULK_UPDATE_CHECK_CELL_SELECTION:
            return state
        case BULK_UPDATE_SET_PREVIEW:
            return Object.assign({}, state, { PreviewInfo: (<BulkUpdateSetPreviewAction>action).PreviewInfo })
        default:
            return state
    }
}