import { RangeState } from './Interface/IState';
import { IRange } from '../../Core/Interface/IExportStrategy';
import { ICellInfo } from '../../Core/Interface/IStrategy';
import * as Redux from 'redux'
import { Helper } from '../../Core/Helper';
import { RangeHelper } from '../../Core/Services/RangeHelper';

export const RANGE_SELECT = 'RANGE_SELECT';
export const RANGE_ADD_UPDATE = 'RANGE_ADD_UPDATE';
export const RANGE_DELETE = 'RANGE_DELETE';

export interface RangeSelectAction extends Redux.Action {
    SelectedRange: string;
}

export interface RangeStartLiveAction extends Redux.Action {
    Range: string;
}

export interface RangeAddUpdateAction extends Redux.Action {
    Index: number,
    Range: IRange
}

export interface RangeDeleteAction extends Redux.Action {
    Index: number
}

export const RangeSelect = (SelectedRange: string): RangeSelectAction => ({
    type: RANGE_SELECT,
    SelectedRange
})

export const RangeAddUpdate = (Index: number, Range: IRange): RangeAddUpdateAction => ({
    type: RANGE_ADD_UPDATE,
    Index,
    Range
})

export const RangeDelete = (Index: number): RangeDeleteAction => ({
    type: RANGE_DELETE,
    Index
})

const initialRangeState: RangeState = {
    Ranges: RangeHelper.CreateSystemRanges(),
    CurrentRange: "",
    CurrentLiveRange: ""
}

export const RangeReducer: Redux.Reducer<RangeState> = (state: RangeState = initialRangeState, action: Redux.Action): RangeState => {
    switch (action.type) {
        case RANGE_SELECT:
            return Object.assign({}, state, { CurrentRange: (<RangeSelectAction>action).SelectedRange })
        case RANGE_ADD_UPDATE: {
            let ranges: IRange[] = [].concat(state.Ranges);

            let actionTypedAddUpdate = (<RangeAddUpdateAction>action)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                ranges[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Range
            } else {
                ranges.push(actionTypedAddUpdate.Range)
            }
            return Object.assign({}, state, { Ranges: ranges, CurrentRange: actionTypedAddUpdate.Range.Name });
        }
        case RANGE_DELETE: {
            let ranges: IRange[] = [].concat(state.Ranges);

            let actionTypedDelete = (<RangeDeleteAction>action)
            ranges.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { Ranges: ranges, CurrentRange: "" })
        }
        default:
            return state
    }
}