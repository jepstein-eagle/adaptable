import { DataSourceState, IDataSource } from '../../PredefinedConfig/IUserState/DataSourceState';
import * as Redux from 'redux';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';
export const DATA_SOURCE_ADD = 'DATA_SOURCE_ADD';
export const DATA_SOURCE_EDIT = 'DATA_SOURCE_EDIT';
export const DATA_SOURCE_DELETE = 'DATA_SOURCE_DELETE';

export interface DataSourceSelectAction extends Redux.Action {
  SelectedDataSource: string;
}

export interface DataSourceAction extends Redux.Action {
  dataSource: IDataSource;
}

export interface DataSourceAddAction extends DataSourceAction {}

export interface DataSourceEditAction extends DataSourceAction {}

export interface DataSourceDeleteAction extends DataSourceAction {}

export const DataSourceSelect = (SelectedDataSource: string): DataSourceSelectAction => ({
  type: DATA_SOURCE_SELECT,
  SelectedDataSource,
});

export const DataSourceAdd = (dataSource: IDataSource): DataSourceAddAction => ({
  type: DATA_SOURCE_ADD,
  dataSource,
});

export const DataSourceEdit = (dataSource: IDataSource): DataSourceEditAction => ({
  type: DATA_SOURCE_EDIT,
  dataSource,
});
export const DataSourceDelete = (dataSource: IDataSource): DataSourceDeleteAction => ({
  type: DATA_SOURCE_DELETE,
  dataSource,
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
    case DATA_SOURCE_ADD: {
      const actionDataSource: IDataSource = (action as DataSourceAction).dataSource;

      if (!actionDataSource.Uuid) {
        actionDataSource.Uuid = createUuid();
      }
      dataSources = [].concat(state.DataSources);
      dataSources.push(actionDataSource);
      return { ...state, DataSources: dataSources };
    }

    case DATA_SOURCE_EDIT: {
      const actionDataSource: IDataSource = (action as DataSourceAction).dataSource;
      return {
        ...state,
        DataSources: state.DataSources.map(abObject =>
          abObject.Uuid === actionDataSource.Uuid ? actionDataSource : abObject
        ),
      };
    }
    case DATA_SOURCE_DELETE: {
      const actionDataSource: IDataSource = (action as DataSourceAction).dataSource;
      return {
        ...state,
        DataSources: state.DataSources.filter(abObject => abObject.Uuid !== actionDataSource.Uuid),
      };
    }
    default:
      return state;
  }
};
