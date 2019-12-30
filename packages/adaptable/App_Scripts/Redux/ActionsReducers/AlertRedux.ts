import { AlertState, AlertDefinition } from '../../PredefinedConfig/AlertState';
import * as Redux from 'redux';
import {
  EMPTY_ARRAY,
  EMPTY_STRING,
  ALERT_DEFAULT_MAX_ALERTS_IN_STORE,
} from '../../Utilities/Constants/GeneralConstants';
import { createUuid } from '../../PredefinedConfig/Uuid';

export const ALERT_DEFIINITION_ADD = 'ALERT_DEFIINITION_ADD';
export const ALERT_DEFIINITION_EDIT = 'ALERT_DEFIINITION_EDIT';
export const ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';

export interface AlertDefinitionAction extends Redux.Action {
  alertDefinition: AlertDefinition;
}

export interface AlertDefinitionAddAction extends AlertDefinitionAction {}

export interface AlertDefinitionEditAction extends AlertDefinitionAction {}

export interface AlertDefinitionDeleteAction extends AlertDefinitionAction {}

export const AlertDefinitionAdd = (alertDefinition: AlertDefinition): AlertDefinitionAddAction => ({
  type: ALERT_DEFIINITION_ADD,
  alertDefinition,
});

export const AlertDefinitionEdit = (
  alertDefinition: AlertDefinition
): AlertDefinitionEditAction => ({
  type: ALERT_DEFIINITION_EDIT,
  alertDefinition,
});

export const AlertDefinitionDelete = (
  alertDefinition: AlertDefinition
): AlertDefinitionDeleteAction => ({
  type: ALERT_DEFIINITION_DELETE,
  alertDefinition,
});

const initialAlertState: AlertState = {
  AlertDefinitions: EMPTY_ARRAY,
  MaxAlertsInStore: ALERT_DEFAULT_MAX_ALERTS_IN_STORE,
  AlertDisplayDiv: EMPTY_STRING,
};

export const AlertReducer: Redux.Reducer<AlertState> = (
  state: AlertState = initialAlertState,
  action: Redux.Action
): AlertState => {
  let alertDefinitions: AlertDefinition[];

  switch (action.type) {
    case ALERT_DEFIINITION_ADD: {
      const actionAlertDefinition: AlertDefinition = (action as AlertDefinitionAction)
        .alertDefinition;

      if (!actionAlertDefinition.Uuid) {
        actionAlertDefinition.Uuid = createUuid();
      }
      alertDefinitions = [].concat(state.AlertDefinitions);
      alertDefinitions.push(actionAlertDefinition);
      return { ...state, AlertDefinitions: alertDefinitions };
    }

    case ALERT_DEFIINITION_EDIT: {
      const actionAlertDefinition: AlertDefinition = (action as AlertDefinitionAction)
        .alertDefinition;
      return {
        ...state,
        AlertDefinitions: state.AlertDefinitions.map(abObject =>
          abObject.Uuid === actionAlertDefinition.Uuid ? actionAlertDefinition : abObject
        ),
      };
    }

    case ALERT_DEFIINITION_DELETE: {
      const actionAlertDefinition: AlertDefinition = (action as AlertDefinitionAction)
        .alertDefinition;
      return {
        ...state,
        AlertDefinitions: state.AlertDefinitions.filter(
          abObject => abObject.Uuid !== actionAlertDefinition.Uuid
        ),
      };
    }

    default:
      return state;
  }
};
