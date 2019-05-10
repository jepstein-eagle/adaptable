import { AlertState } from './Interface/IState';
import * as Redux from 'redux';
import { IAlertDefinition } from '../../Utilities/Interface/BlotterObjects/IAlertDefinition';
import { MessageType } from '../../Utilities/Enums';
import {
  EMPTY_ARRAY,
  EMPTY_STRING,
  ALERT_DEFAULT_MAX_ALERTS_IN_STORE,
} from '../../Utilities/Constants/GeneralConstants';

export const ALERT_DEFIINITION_ADD_UPDATE = 'ALERT_DEFIINITION_ADD_UPDATE';
export const ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';
export const ALERT_DEFIINITION_SELECT = 'ALERT_DEFIINITION_SELECT';
export const ALERT_DEFIINITION_CHANGE_ALERT_TYPE = 'ALERT_DEFIINITION_CHANGE_ALERT_TYPE';

export interface AlertDefinitionAddUpdateAction extends Redux.Action {
  index: number;
  alertDefinition: IAlertDefinition;
}

export interface AlertDefinitionDeleteAction extends Redux.Action {
  index: number;
}

export interface AlertDefinitionChangeMessageTypeAction extends Redux.Action {
  index: number;
  messageType: MessageType;
}

export const AlertDefinitionAddUpdate = (
  index: number,
  alertDefinition: IAlertDefinition
): AlertDefinitionAddUpdateAction => ({
  type: ALERT_DEFIINITION_ADD_UPDATE,
  index,
  alertDefinition,
});

export const AlertDefinitionDelete = (index: number): AlertDefinitionDeleteAction => ({
  type: ALERT_DEFIINITION_DELETE,
  index,
});

export const AlertDefinitionChangeMessageType = (
  index: number,
  messageType: MessageType
): AlertDefinitionChangeMessageTypeAction => ({
  type: ALERT_DEFIINITION_CHANGE_ALERT_TYPE,
  index,
  messageType,
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
    case ALERT_DEFIINITION_ADD_UPDATE: {
      let actionTypedAddUpdate = <AlertDefinitionAddUpdateAction>action;
      alertDefinitions = [].concat(state.AlertDefinitions);
      if (actionTypedAddUpdate.index != -1) {
        // it exists
        alertDefinitions[actionTypedAddUpdate.index] = actionTypedAddUpdate.alertDefinition;
      } else {
        alertDefinitions.push(actionTypedAddUpdate.alertDefinition);
      }
      return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
    }
    case ALERT_DEFIINITION_DELETE: {
      let actionTypedDelete = <AlertDefinitionDeleteAction>action;
      alertDefinitions = [].concat(state.AlertDefinitions);
      alertDefinitions.splice(actionTypedDelete.index, 1);
      return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
    }
    case ALERT_DEFIINITION_CHANGE_ALERT_TYPE: {
      let actionTyped = <AlertDefinitionChangeMessageTypeAction>action;
      alertDefinitions = [].concat(state.AlertDefinitions);
      let alert = alertDefinitions[actionTyped.index];
      alertDefinitions[actionTyped.index] = Object.assign({}, alert, {
        MessageType: actionTyped.messageType,
      });
      return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
    }

    default:
      return state;
  }
};
