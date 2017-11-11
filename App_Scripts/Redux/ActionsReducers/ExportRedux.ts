import {ExportState} from './Interface/IState';
import { ExportDestination } from '../../Core/Enums';
import * as Redux from 'redux'

export const EXPORT = 'EXPORT';

export interface ExportAction extends Redux.Action {
    RangeId: string;
    ExportDestination: ExportDestination
}

export const Export = (RangeId: string, ExportDestination: ExportDestination): ExportAction => ({
    type: EXPORT,
    RangeId,
    ExportDestination
})

const initialExportState: ExportState = {
 }

export const ExportReducer: Redux.Reducer<ExportState> = (state: ExportState = initialExportState, action: Redux.Action): ExportState => {
    switch (action.type) {
        case EXPORT:
        return state
        default:
            return state
    }
}