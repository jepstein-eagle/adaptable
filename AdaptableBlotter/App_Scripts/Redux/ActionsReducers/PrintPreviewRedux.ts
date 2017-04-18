import {PrintPreviewState} from './Interface/IState';
import * as Redux from 'redux'

export const PRINT_PREVIEW_APPLY = 'PRINT_PREVIEW_APPLY';

export interface PrintPreviewApplyAction extends Redux.Action {
}

export const PrintPreviewApply = (): PrintPreviewApplyAction => ({
    type: PRINT_PREVIEW_APPLY
})



const initialExportState: PrintPreviewState = {
}

// ok, so not actually doing anything at the moment but will add some properties in due course...
export const PrintPreviewReducer: Redux.Reducer<PrintPreviewState> = (state: PrintPreviewState = initialExportState, action: Redux.Action): PrintPreviewState => {
    switch (action.type) {
        case PRINT_PREVIEW_APPLY:
            return state
        default:
            return state
    }
}