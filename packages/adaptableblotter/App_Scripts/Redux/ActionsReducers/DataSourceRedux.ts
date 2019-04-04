import { DataSourceState } from './Interface/IState';
import * as Redux from 'redux'
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { IDataSource } from '../../Utilities/Interface/BlotterObjects/IDataSource';

export const DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';
export const DATASOURCE_ADD_UPDATE = 'DATASOURCE_ADD_UPDATE';
export const DATASOURCE_DELETE = 'DATASOURCE_DELETE';
export const DATASOURCE_CHANGE_NAME = 'DATASOURCE_CHANGE_NAME';
export const DATASOURCE_CHANGE_DESCRIPTION = 'DATASOURCE_CHANGE_DESCRIPTION';


export interface DataSourceSelectAction extends Redux.Action {
    SelectedDataSource: string
}

export interface DataSourceAddUpdateAction extends Redux.Action {
    index: number
    DataSource: IDataSource
}

export interface DataSourceDeleteAction extends Redux.Action {
    DataSource: IDataSource
}

export interface DataSourceChangeNameAction extends Redux.Action {
    DataSource: IDataSource,
    Name: string
}

export interface DataSourceChangeDescriptionAction extends Redux.Action {
    DataSource: IDataSource,
    Description: String
}


export const DataSourceSelect = (SelectedDataSource: string): DataSourceSelectAction => ({
    type: DATA_SOURCE_SELECT,
    SelectedDataSource
})

export const DataSourceAddUpdate = (index: number,DataSource: IDataSource): DataSourceAddUpdateAction => ({
    type: DATASOURCE_ADD_UPDATE,
    index,
    DataSource
})

export const DataSourceChangeName = (DataSource: IDataSource, Name: string): DataSourceChangeNameAction => ({
    type: DATASOURCE_CHANGE_NAME,
    DataSource,
    Name
})

export const DataSourceChangeDescription = (DataSource: IDataSource, Description: String): DataSourceChangeDescriptionAction => ({
    type: DATASOURCE_CHANGE_DESCRIPTION,
    DataSource,
    Description
})


export const DataSourceDelete = (DataSource: IDataSource): DataSourceDeleteAction => ({
    type: DATASOURCE_DELETE,
    DataSource
})

const initialDataSourceState: DataSourceState = {
    DataSources: EMPTY_ARRAY,
    CurrentDataSource: EMPTY_STRING
}

export const DataSourceReducer: Redux.Reducer<DataSourceState> = (state: DataSourceState = initialDataSourceState, action: Redux.Action): DataSourceState => {
    let dataSources: IDataSource[]

    switch (action.type) {
        case DATA_SOURCE_SELECT:
            return Object.assign({}, state, { CurrentDataSource: (<DataSourceSelectAction>action).SelectedDataSource })
        case DATASOURCE_CHANGE_NAME: {
            let actionTyped = <DataSourceChangeNameAction>action
            let DataSource = actionTyped.DataSource
            dataSources = [].concat(state.DataSources)
            let index = dataSources.indexOf(DataSource)
            dataSources[index] = Object.assign({}, DataSource, { Name: actionTyped.Name })
            return Object.assign({}, state, { DataSources: dataSources });
        }
        case DATASOURCE_CHANGE_DESCRIPTION: {
            let actionTyped = <DataSourceChangeDescriptionAction>action
            let DataSource = actionTyped.DataSource
            dataSources = [].concat(state.DataSources)
            let index = dataSources.indexOf(DataSource)
            dataSources[index] = Object.assign({}, DataSource, { Description: actionTyped.Description })
            return Object.assign({}, state, { DataSources: dataSources });
        }
        case DATASOURCE_ADD_UPDATE:
        let actionTypedAddUpdate = (<DataSourceAddUpdateAction>action)
        dataSources = [].concat(state.DataSources)
        if (actionTypedAddUpdate.index != -1) {  // it exists
            dataSources[actionTypedAddUpdate.index] = actionTypedAddUpdate.DataSource
        } else {
            dataSources.push(actionTypedAddUpdate.DataSource)
        }
        return Object.assign({}, state, { DataSources: dataSources})//, CurrentDataSource: currentSearchName })
        case DATASOURCE_DELETE: {
            let deletedDataSource = (<DataSourceDeleteAction>action).DataSource;
            dataSources = [].concat(state.DataSources)
            let index = dataSources.findIndex(x => x.Name == deletedDataSource.Name)
            dataSources.splice(index, 1);
            return Object.assign({}, state, { DataSources: dataSources });
        }
        default:
            return state
    }
}