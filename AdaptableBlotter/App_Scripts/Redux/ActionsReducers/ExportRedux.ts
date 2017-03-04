/// <reference path="../../../typings/index.d.ts" />

import {ExportState} from './Interface/IState';

export const EXPORT_APPLY = 'EXPORT_APPLY';
export const EXPORT_SET_FILENAME = 'EXPORT_SET_FILENAME';
export const EXPORT_SET_ALL_PAGES = 'EXPORT_SET_ALL_PAGES';
export const EXPORT_SET_FILTERABLE = 'EXPORT_SET_FILTERABLE';

export interface ExportApplyAction extends Redux.Action {
}

export interface ExportSetFileNameAction extends Redux.Action {
    FileName: string
}

export interface ExportSetAllPagesAction extends Redux.Action {
    AllPages: boolean
}

export interface ExportSetFilterableAction extends Redux.Action {
    Filterable: boolean
}

export const ExportApply = (): ExportApplyAction => ({
    type: EXPORT_APPLY
})

export const ExportSetFileName = (FileName: string): ExportSetFileNameAction => ({
    type: EXPORT_SET_FILENAME,
    FileName: FileName
})

export const ExportSetAllPages = (AllPages: boolean): ExportSetAllPagesAction => ({
    type: EXPORT_SET_ALL_PAGES,
    AllPages: AllPages
})

export const ExportSetFilterable = (Filterable: boolean): ExportSetFilterableAction => ({
    type: EXPORT_SET_FILTERABLE,
    Filterable: Filterable
})

const initialExportState: ExportState = {
    FileName: "Adaptable Blotter Export",
    AllPages: true,   
    Filterable: true,   
}

export const ExportReducer: Redux.Reducer<ExportState> = (state: ExportState = initialExportState, action: Redux.Action): ExportState => {
    switch (action.type) {
        case EXPORT_APPLY:
            return state
        case EXPORT_SET_FILENAME:
           return Object.assign({}, state, { FileName: (<ExportSetFileNameAction>action).FileName })
       case EXPORT_SET_ALL_PAGES:
           return Object.assign({}, state, { AllPages: (<ExportSetAllPagesAction>action).AllPages })            
       case EXPORT_SET_FILTERABLE:
           return Object.assign({}, state, { Filterable: (<ExportSetFilterableAction>action).Filterable })      
      
        default:
            return state
    }
}