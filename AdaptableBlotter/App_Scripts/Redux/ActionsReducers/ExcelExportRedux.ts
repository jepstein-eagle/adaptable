/// <reference path="../../../typings/index.d.ts" />

import {ExcelExportState} from './Interface/IState';

export const EXPORT_APPLY = 'EXPORT_APPLY';
export const EXPORT_SETFILENAME = 'EXPORT_SETFILENAME';
export const EXPORT_SETALLPAGES = 'EXPORT_SETALLPAGES';

export interface ApplyExportAction extends Redux.Action {
}

export interface ExportSetFileNameAction extends Redux.Action {
    FileName: string
}

export interface ExportSetAllPagesAction extends Redux.Action {
    AllPages: boolean
}

export const ApplyExport = (): ApplyExportAction => ({
    type: EXPORT_APPLY
})

export const FileNameSetOperation = (FileName: string): ExportSetFileNameAction => ({
    type: EXPORT_SETFILENAME,
    FileName: FileName
})

export const AllPagesSetOperation = (AllPages: boolean): ExportSetAllPagesAction => ({
    type: EXPORT_SETALLPAGES,
    AllPages: AllPages
})

const initialExportState: ExcelExportState = {
    FileName: "AdaptableBlotterExport",
    AllPages: true,
}

export const ExcelExportReducer: Redux.Reducer<ExcelExportState> = (state: ExcelExportState = initialExportState, action: Redux.Action): ExcelExportState => {
    switch (action.type) {
        case EXPORT_APPLY:
            return state
        case EXPORT_SETFILENAME:
           return Object.assign({}, state, { FileName: (<ExportSetFileNameAction>action).FileName })
       case EXPORT_SETALLPAGES:
           return Object.assign({}, state, { AllPages: (<ExportSetAllPagesAction>action).AllPages })
      
        default:
            return state
    }
}