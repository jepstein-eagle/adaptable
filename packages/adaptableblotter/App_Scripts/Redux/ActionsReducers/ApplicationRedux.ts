import * as Redux from 'redux';
import { EMPTY_ARRAY, EMPTY_STRING } from '../../Utilities/Constants/GeneralConstants';
import { ApplicationState, ApplicationDataEntry } from '../../PredefinedConfig/ApplicationState';

export const APPLICATION_DATA_ENTRY_ADD = 'APPLICATION_DATA_ENTRY_ADD';
export const APPLICATION_DATA_ENTRY_EDIT = 'APPLICATION_DATA_ENTRY_EDIT';
export const APPLICATION_DATA_ENTRY_DELETE = 'APPLICATION_DATA_ENTRY_DELETE';

export interface ApplicationDataEntryAddAction extends Redux.Action {
  applicationDataEntry: ApplicationDataEntry;
}

export interface ApplicationDataEntryEditAction extends Redux.Action {
  applicationDataEntry: ApplicationDataEntry;
}

export interface ApplicationDataEntryDeleteAction extends Redux.Action {
  applicationDataEntry: ApplicationDataEntry;
}

export const ApplicationDataEntryAdd = (
  applicationDataEntry: ApplicationDataEntry
): ApplicationDataEntryAddAction => ({
  type: APPLICATION_DATA_ENTRY_ADD,
  applicationDataEntry,
});

export const ApplicationDataEntryEdit = (
  applicationDataEntry: ApplicationDataEntry
): ApplicationDataEntryEditAction => ({
  type: APPLICATION_DATA_ENTRY_EDIT,
  applicationDataEntry,
});

export const ApplicationDataEntryDelete = (
  applicationDataEntry: ApplicationDataEntry
): ApplicationDataEntryDeleteAction => ({
  type: APPLICATION_DATA_ENTRY_DELETE,
  applicationDataEntry,
});

const initialFilterState: ApplicationState = {
  ApplicationDataEntries: EMPTY_ARRAY,
};

export const ApplicationReducer: Redux.Reducer<ApplicationState> = (
  state: ApplicationState = initialFilterState,
  action: Redux.Action
): ApplicationState => {
  let applicationDataEntries: ApplicationDataEntry[];
  let index: number;
  switch (action.type) {
    case APPLICATION_DATA_ENTRY_ADD:
      const actionTypedAdd = action as ApplicationDataEntryAddAction;
      applicationDataEntries = [].concat(state.ApplicationDataEntries);
      applicationDataEntries.push(actionTypedAdd.applicationDataEntry);
      return Object.assign({}, state, { ApplicationDataEntries: applicationDataEntries });

    case APPLICATION_DATA_ENTRY_EDIT:
      const actionTypedUpdate = action as ApplicationDataEntryEditAction;
      applicationDataEntries = [].concat(state.ApplicationDataEntries);
      index = applicationDataEntries.findIndex(
        fe => fe.Key == actionTypedUpdate.applicationDataEntry.Key
      );
      applicationDataEntries[index] = actionTypedUpdate.applicationDataEntry;
      return Object.assign({}, state, { ApplicationDataEntries: applicationDataEntries });

    case APPLICATION_DATA_ENTRY_DELETE:
      const actionTypedDelete = action as ApplicationDataEntryDeleteAction;
      applicationDataEntries = [].concat(state.ApplicationDataEntries);
      index = applicationDataEntries.findIndex(
        a => a.Key == actionTypedDelete.applicationDataEntry.Key
      );
      applicationDataEntries.splice(index, 1);
      return Object.assign({}, state, { ApplicationDataEntries: applicationDataEntries });

    default:
      return state;
  }
};
