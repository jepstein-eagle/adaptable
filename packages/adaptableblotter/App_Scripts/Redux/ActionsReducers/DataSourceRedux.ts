import { DataSourceState } from './Interface/IState';
import * as Redux from 'redux'
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';

export const DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';



export interface DataSourceSelectAction extends Redux.Action {
    SelectedDataSource: string
}


export const DataSourceSelect = (SelectedDataSource: string): DataSourceSelectAction => ({
    type: DATA_SOURCE_SELECT,
    SelectedDataSource
})

const initialDataSourceState: DataSourceState = {
    DataSources: EMPTY_ARRAY,
    CurrentDataSource: EMPTY_STRING
}

export const DataSourceReducer: Redux.Reducer<DataSourceState> = (state: DataSourceState = initialDataSourceState, action: Redux.Action): DataSourceState => {
    let index: number;

    switch (action.type) {
        case DATA_SOURCE_SELECT:
            return Object.assign({}, state, { CurrentDataSource: (<DataSourceSelectAction>action).SelectedDataSource })

        default:
            return state
    }
}