import { DataSourceState } from './Interface/IState';
import * as Redux from 'redux';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { IDataSource } from '../../Utilities/Interface/BlotterObjects/IDataSource';

export const DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';
export const DATASOURCE_ADD = 'DATASOURCE_ADD';
export const DATASOURCE_EDIT = 'DATASOURCE_EDIT';
export const DATASOURCE_DELETE = 'DATASOURCE_DELETE';

export interface DataSourceSelectAction extends Redux.Action {
  SelectedDataSource: string;
}

export interface DataSourceAddAction extends Redux.Action {
  DataSource: IDataSource;
}

export interface DataSourceEditAction extends Redux.Action {
  index: number;
  DataSource: IDataSource;
}

export interface DataSourceDeleteAction extends Redux.Action {
  DataSource: IDataSource;
}

export const DataSourceSelect = (SelectedDataSource: string): DataSourceSelectAction => ({
  type: DATA_SOURCE_SELECT,
  SelectedDataSource,
});

export const DataSourceAdd = (DataSource: IDataSource): DataSourceAddAction => ({
  type: DATASOURCE_ADD,
  DataSource,
});

export const DataSourceEdit = (index: number, DataSource: IDataSource): DataSourceEditAction => ({
  type: DATASOURCE_EDIT,
  index,
  DataSource,
});

export const DataSourceDelete = (DataSource: IDataSource): DataSourceDeleteAction => ({
  type: DATASOURCE_DELETE,
  DataSource,
});

const initialDataSourceState: DataSourceState = {
  DataSources: EMPTY_ARRAY,
  CurrentDataSource: EMPTY_STRING,
};

export const DataSourceReducer: Redux.Reducer<DataSourceState> = (
  state: DataSourceState = initialDataSourceState,
  action: Redux.Action
): DataSourceState => {
  let dataSources: IDataSource[];

  switch (action.type) {
    case DATA_SOURCE_SELECT:
      return Object.assign({}, state, {
        CurrentDataSource: (<DataSourceSelectAction>action).SelectedDataSource,
      });
    case DATASOURCE_ADD:
      let actionTypedAdd = <DataSourceAddAction>action;
      dataSources = [].concat(state.DataSources);
      dataSources.push(actionTypedAdd.DataSource);
      return Object.assign({}, state, { DataSources: dataSources });
    case DATASOURCE_EDIT:
      let actionTypedAddUpdate = <DataSourceEditAction>action;
      dataSources = [].concat(state.DataSources);
      dataSources[actionTypedAddUpdate.index] = actionTypedAddUpdate.DataSource;
      return Object.assign({}, state, { DataSources: dataSources });
    case DATASOURCE_DELETE: {
      let deletedDataSource = (<DataSourceDeleteAction>action).DataSource;
      dataSources = [].concat(state.DataSources);
      let index = dataSources.findIndex(x => x.Name == deletedDataSource.Name);
      dataSources.splice(index, 1);
      return Object.assign({}, state, { DataSources: dataSources });
    }
    default:
      return state;
  }
};
