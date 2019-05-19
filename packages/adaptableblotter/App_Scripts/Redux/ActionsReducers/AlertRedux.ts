import { AlertState } from './Interface/IState';
import * as Redux from 'redux';
import { IAlertDefinition } from '../../Utilities/Interface/BlotterObjects/IAlertDefinition';
import { MessageType } from '../../Utilities/Enums';
import {
  EMPTY_ARRAY,
  EMPTY_STRING,
  ALERT_DEFAULT_MAX_ALERTS_IN_STORE,
} from '../../Utilities/Constants/GeneralConstants';

export const ALERT_DEFIINITION_ADD = 'ALERT_DEFIINITION_ADD';
export const ALERT_DEFIINITION_EDIT = 'ALERT_DEFIINITION_EDIT';
export const ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';
export const ALERT_DEFIINITION_SELECT = 'ALERT_DEFIINITION_SELECT';

export interface AlertDefinitionAddAction extends Redux.Action {
  alertDefinition: IAlertDefinition;
}

export interface AlertDefinitionEditAction extends Redux.Action {
  index: number;
  alertDefinition: IAlertDefinition;
}

export interface AlertDefinitionDeleteAction extends Redux.Action {
  index: number;
  alertDefinition: IAlertDefinition;
}

export const AlertDefinitionAdd = (
  alertDefinition: IAlertDefinition
): AlertDefinitionAddAction => ({
  type: ALERT_DEFIINITION_ADD,
  alertDefinition,
});

export const AlertDefinitionEdit = (
  index: number,
  alertDefinition: IAlertDefinition
): AlertDefinitionEditAction => ({
  type: ALERT_DEFIINITION_EDIT,
  index,
  alertDefinition,
});

export const AlertDefinitionDelete = (
  index: number,
  alertDefinition: IAlertDefinition
): AlertDefinitionDeleteAction => ({
  type: ALERT_DEFIINITION_DELETE,
  index,
  alertDefinition,
});

const initialAlertState: AlertState = {
  AlertDefinitions: EMPTY_ARRAY,
  MaxAlertsInStore: ALERT_DEFAULT_MAX_ALERTS_IN_STORE,
  AlertPopupDiv: EMPTY_STRING,
};

export const AlertReducer: Redux.Reducer<AlertState> = (
  state: AlertState = initialAlertState,
  action: Redux.Action
): AlertState => {
  let alertDefinitions: IAlertDefinition[];

  switch (action.type) {
    case ALERT_DEFIINITION_ADD: {
      let actionTypedAddUpdate = <AlertDefinitionAddAction>action;
      alertDefinitions = [].concat(state.AlertDefinitions);
      alertDefinitions.push(actionTypedAddUpdate.alertDefinition);
      return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
    }
    case ALERT_DEFIINITION_EDIT: {
      let actionTypedAddUpdate = <AlertDefinitionEditAction>action;
      alertDefinitions = [].concat(state.AlertDefinitions);
      alertDefinitions[actionTypedAddUpdate.index] = actionTypedAddUpdate.alertDefinition;
      return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
    }
    case ALERT_DEFIINITION_DELETE: {
      let actionTypedDelete = <AlertDefinitionDeleteAction>action;
      alertDefinitions = [].concat(state.AlertDefinitions);
      alertDefinitions.splice(actionTypedDelete.index, 1);
      return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
    }

    default:
      return state;
  }
};
