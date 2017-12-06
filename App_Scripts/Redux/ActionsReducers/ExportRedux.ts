import { ExportState } from './Interface/IState';
import { ExportDestination } from '../../Core/Enums';
import * as Redux from 'redux'

export const EXPORT = 'EXPORT';
export const IPP_LOGIN = 'IPP_LOGIN';

export interface ExportAction extends Redux.Action {
    Range: string;
    ExportDestination: ExportDestination
}

export const Export = (Range: string, ExportDestination: ExportDestination): ExportAction => ({
    type: EXPORT,
    Range,
    ExportDestination
})

export interface IPPLoginAction extends Redux.Action {
    Login: string;
    Password: string;
    SuccessAction: Redux.Action
}

export const IPPLogin = (Login: string, Password: string, SuccessAction: Redux.Action): IPPLoginAction => ({
    type: IPP_LOGIN,
    Login,
    Password,
    SuccessAction
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