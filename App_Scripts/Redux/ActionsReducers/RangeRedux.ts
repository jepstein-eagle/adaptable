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
    SelectedRangeId: string;
}

export interface RangeAddUpdateAction extends Redux.Action {
    Range: IRange
}

export interface RangeDeleteAction extends Redux.Action {
    Range: IRange
}

export const RangeSelect = (SelectedRangeId: string): RangeSelectAction => ({
    type: RANGE_SELECT,
    SelectedRangeId
})

export const RangeAddUpdate = (Range: IRange): RangeAddUpdateAction => ({
    type: RANGE_ADD_UPDATE,
    Range
})

export const RangeDelete = (Range: IRange): RangeDeleteAction => ({
    type: RANGE_DELETE,
    Range
})

const initialRangeState: RangeState = {
    Ranges: RangeHelper.CreateSystemRanges(),
    CurrentRangeId: ""
}

export const RangeReducer: Redux.Reducer<RangeState> = (state: RangeState = initialRangeState, action: Redux.Action): RangeState => {
    let index: number;
    let ranges: IRange[] = [].concat(state.Ranges);

    switch (action.type) {
       
        case RANGE_SELECT:
            return Object.assign({}, state, { CurrentRangeId: (<RangeSelectAction>action).SelectedRangeId })

        case RANGE_ADD_UPDATE: {
            let actionTypedAddUpdate = (<RangeAddUpdateAction>action)
            index = ranges.findIndex(r => r.Uid == actionTypedAddUpdate.Range.Uid)
            if (index != -1) {  // it exists
                actionTypedAddUpdate.Range.Uid = Helper.generateUid();
                ranges[index] = actionTypedAddUpdate.Range
            } else {
                ranges.push(actionTypedAddUpdate.Range)
            }
            return Object.assign({}, state, { Ranges: ranges, CurrentRangeId: actionTypedAddUpdate.Range.Uid });
        }
        case RANGE_DELETE: {
            let actionTypedDelete = (<RangeDeleteAction>action)
            index = ranges.findIndex(r => r.Uid == actionTypedDelete.Range.Uid)
            ranges.splice(index, 1);
            return Object.assign({}, state, { Ranges: ranges, CurrentRangeId: "" })
        }
        default:
            return state
    }
}