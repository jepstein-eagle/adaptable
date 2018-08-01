import { DataSourceState } from './Interface/IState';
import * as Redux from 'redux'

export const DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';



export interface DataSourceSelectAction extends Redux.Action {
    SelectedDataSource: string
}


export const DataSourceSelect = (SelectedDataSource: string): DataSourceSelectAction => ({
    type: DATA_SOURCE_SELECT,
    SelectedDataSource
})

const initialDataSourceState: DataSourceState = {
    DataSources: ["Book 1", "Book 2", "Book 3", "Book 4"],
     CurrentDataSource: ""
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