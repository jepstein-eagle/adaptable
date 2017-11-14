import {ExportState} from './Interface/IState';
import { ExportDestination } from '../../Core/Enums';
import * as Redux from 'redux'

export const EXPORT = 'EXPORT';

export interface ExportAction extends Redux.Action {
    Range: string;
    ExportDestination: ExportDestination
}

export const Export = (Range: string, ExportDestination: ExportDestination): ExportAction => ({
    type: EXPORT,
    Range,
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