import { AlertState } from './Interface/IState';
import * as Redux from 'redux'
import { IAlertDefinition } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { MessageType } from '../../Core/Enums';
import { IAlert } from '../../Core/Interface/IMessage';

export const ALERT_DEFIINITION_ADD_UPDATE = 'ALERT_DEFIINITION_ADD_UPDATE';
export const ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';
export const ALERT_DEFIINITION_SELECT = 'ALERT_DEFIINITION_SELECT';
export const ALERT_DEFIINITION_CHANGE_ALERT_TYPE = 'ALERT_DEFIINITION_CHANGE_ALERT_TYPE';

export const ALERT_ADD = 'ALERT_ADD';
export const ALERT_DELETE = 'ALERT_DELETE';
export const ALERT_DELETE_ALL = 'ALERT_DELETE_ALL';

export interface AlertDefinitionAddUpdateAction extends Redux.Action {
    Index: number
    AlertDefinition: IAlertDefinition
}

export interface AlertDefinitionDeleteAction extends Redux.Action {
    Index: number
}

export interface AlertDefinitionChangeMessageTypeAction extends Redux.Action {
    Index: number,
    MessageType: MessageType;
}

export interface AlertAddAction extends Redux.Action {
    Alert: IAlert
}

export interface AlertDeleteAction extends Redux.Action {
    Index: number
}

export interface AlertDeleteAllAction extends Redux.Action {
    
}

export const AlertDefinitionAddUpdate = (Index: number, AlertDefinition: IAlertDefinition): AlertDefinitionAddUpdateAction => ({
    type: ALERT_DEFIINITION_ADD_UPDATE,
    Index,
    AlertDefinition
})

export const AlertDefinitionDelete = (Index: number): AlertDefinitionDeleteAction => ({
    type: ALERT_DEFIINITION_DELETE,
    Index,
})

export const AlertDefinitionChangeMessageType = (Index: number, MessageType: MessageType): AlertDefinitionChangeMessageTypeAction => ({
    type: ALERT_DEFIINITION_CHANGE_ALERT_TYPE,
    Index,
    MessageType
})

export const AlertAdd = (Alert: IAlert): AlertAddAction => ({
    type: ALERT_ADD,
    Alert
})

export const AlertDelete = (Index: number): AlertDeleteAction => ({
    type: ALERT_DELETE,
    Index,
})

export const AlertDeleteAll = (): AlertDeleteAllAction => ({
    type: ALERT_DELETE_ALL,
})

const initialAlertState: AlertState = {
    AlertDefinitions: [],
    MaxAlertsInStore: 5,
    Alerts: []
}

export const AlertReducer: Redux.Reducer<AlertState> = (state: AlertState = initialAlertState, action: Redux.Action): AlertState => {
    let alertDefinitions: IAlertDefinition[]
    let alerts: IAlert[]

    switch (action.type) {
        case ALERT_DEFIINITION_ADD_UPDATE: {
            let actionTypedAddUpdate = (<AlertDefinitionAddUpdateAction>action)
            alertDefinitions = [].concat(state.AlertDefinitions)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                alertDefinitions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.AlertDefinition
            } else {
                alertDefinitions.push(actionTypedAddUpdate.AlertDefinition)
            }
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions })
        }
        case ALERT_DEFIINITION_DELETE: {
            let actionTypedDelete = (<AlertDefinitionDeleteAction>action)
            alertDefinitions = [].concat(state.AlertDefinitions)
            alertDefinitions.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions })
        }
        case ALERT_DEFIINITION_CHANGE_ALERT_TYPE: {
            let actionTyped = (<AlertDefinitionChangeMessageTypeAction>action)
            alertDefinitions = [].concat(state.AlertDefinitions)
            let alert = alertDefinitions[actionTyped.Index]
            alertDefinitions[actionTyped.Index] = Object.assign({}, alert, { MessageType: actionTyped.MessageType })
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions })
        }

        case ALERT_ADD: {
            let actionTypedAdd = (<AlertAddAction>action)
            alerts = [].concat(state.Alerts)
            if (alerts.length == state.MaxAlertsInStore) {  // we have hit the maximum so remove first item (oldest)
                alerts.splice(0, 1);
            }
            alerts.push(actionTypedAdd.Alert)
            return Object.assign({}, state, { Alerts: alerts })
        }
        case ALERT_DELETE: {
            let actionTypedDelete = (<AlertDeleteAction>action)
            alerts = [].concat(state.Alerts)
            alerts.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { Alerts: alerts })
        }
        case ALERT_DELETE_ALL: {
            return Object.assign({}, state, { Alerts: [] })
        }

        default:
            return state
    }
}