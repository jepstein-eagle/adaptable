import { ExportDestination } from '../../Core/Enums';
import { RangeState } from './Interface/IState';
import { IRange, ILiveRange, IPPDomain } from '../../Core/Interface/IExportStrategy'
import { ICellInfo } from '../../Core/Interface/IStrategy';
import * as Redux from 'redux'
import { Helper } from '../../Core/Helper';
import { RangeHelper } from '../../Core/Services/RangeHelper';

export const RANGE_SELECT = 'RANGE_SELECT';
export const RANGE_ADD_UPDATE = 'RANGE_ADD_UPDATE';
export const RANGE_DELETE = 'RANGE_DELETE';
export const RANGE_START_LIVE = 'RANGE_START_LIVE';
export const RANGE_STOP_LIVE = 'RANGE_STOP_LIVE';
export const RANGE_SET_ERROR_MSG = 'RANGE_SET_ERROR_MSG';

export interface RangeSelectAction extends Redux.Action {
    SelectedRange: string;
}

export interface RangeStartLiveAction extends Redux.Action {
    Range: string;
    ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
    WorkbookName: string
}

export const RangeStartLive = (Range: string, WorkbookName: string, ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): RangeStartLiveAction => ({
    type: RANGE_START_LIVE,
    Range,
    ExportDestination,
    WorkbookName
})

export interface RangeSetErrorMsgAction extends Redux.Action {
    ErrorMsg: string
}

export const RangeSetErrorMsg = (ErrorMsg: string): RangeSetErrorMsgAction => ({
    type: RANGE_SET_ERROR_MSG,
    ErrorMsg
})

export interface RangeStopLiveAction extends Redux.Action {
    Range: string;
    ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull
}

export const RangeStopLive = (Range: string, ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull): RangeStopLiveAction => ({
    type: RANGE_STOP_LIVE,
    Range,
    ExportDestination
})

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
    CurrentLiveRanges: [],
    ErrorMsg: ""
}

export const RangeReducer: Redux.Reducer<RangeState> = (state: RangeState = initialRangeState, action: Redux.Action): RangeState => {
    switch (action.type) {
        case RANGE_SELECT:
            return Object.assign({}, state, { CurrentRange: (<RangeSelectAction>action).SelectedRange })
        case RANGE_START_LIVE: {
            let actionTyped = (<RangeStartLiveAction>action)
            let currentLiveRanges: ILiveRange[] = [].concat(state.CurrentLiveRanges);
            currentLiveRanges.push({
                ExportDestination: actionTyped.ExportDestination,
                Range: actionTyped.Range,
                WorkbookName: actionTyped.WorkbookName
            })
            return Object.assign({}, state, { CurrentLiveRanges: currentLiveRanges })
        }
        case RANGE_STOP_LIVE: {
            let actionTyped = (<RangeStopLiveAction>action)
            let currentLiveRanges: ILiveRange[] = [].concat(state.CurrentLiveRanges);
            let index = currentLiveRanges.findIndex(x => x.Range == actionTyped.Range && x.ExportDestination == actionTyped.ExportDestination)
            currentLiveRanges.splice(index, 1)
            return Object.assign({}, state, { CurrentLiveRanges: currentLiveRanges })
        }
        case RANGE_SET_ERROR_MSG: {
            let actionTyped = (<RangeSetErrorMsgAction>action)
            return Object.assign({}, state, { ErrorMsg: actionTyped.ErrorMsg })
        }
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