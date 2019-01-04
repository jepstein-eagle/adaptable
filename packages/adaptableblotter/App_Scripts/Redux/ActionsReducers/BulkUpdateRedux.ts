import { BulkUpdateState } from './Interface/IState';
import * as Redux from 'redux'

export const BULK_UPDATE_APPLY = 'BULK_UPDATE_APPLY';
export const BULK_UPDATE_CHANGE_VALUE = 'BULK_UPDATE_CHANGE_VALUE';

export interface BulkUpdateApplyAction extends Redux.Action {
    bypassCellValidationWarnings: boolean
}

export interface BulkUpdateChangeValueAction extends Redux.Action {
    value: string
}



export const BulkUpdateApply = (bypassCellValidationWarnings: boolean): BulkUpdateApplyAction => ({
    type: BULK_UPDATE_APPLY,
    bypassCellValidationWarnings
})

export const BulkUpdateChangeValue = (value: string): BulkUpdateChangeValueAction => ({
    type: BULK_UPDATE_CHANGE_VALUE,
    value
})



const initialBulkUpdateState: BulkUpdateState = {
    BulkUpdateValue: "",
 }

export const BulkUpdateReducer: Redux.Reducer<BulkUpdateState> = (state: BulkUpdateState = initialBulkUpdateState, action: Redux.Action): BulkUpdateState => {
    switch (action.type) {
        case BULK_UPDATE_APPLY:
            //we apply logic in the middleware since it's an API call
            return Object.assign({}, state, { PreviewInfo: null })
        case BULK_UPDATE_CHANGE_VALUE:
            return Object.assign({}, state, { BulkUpdateValue: (<BulkUpdateChangeValueAction>action).value })
         default:
            return state
    }
}