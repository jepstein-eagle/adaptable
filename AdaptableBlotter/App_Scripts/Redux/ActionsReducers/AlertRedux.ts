/// <reference path="../../../typings/index.d.ts" />

import { AlertState } from './Interface/IState';
import { IAlert, TempNotificationCreator } from '../../Core/Interface/IAlertStrategy';


export const ALERT_ADD_OR_UPDATE = 'ALERT_ADD_OR_UPDATE';
export const ALERT_DELETE = 'ALERT_DELETE';


export interface AlertAddOrUpdateAction extends Redux.Action {
    Index: number,
    Alert: IAlert
}

export interface AlertDeleteAction extends Redux.Action {
    Index: number
}

export const AddEditAlert = (Index: number, Alert: IAlert): AlertAddOrUpdateAction => ({
    type: ALERT_ADD_OR_UPDATE,
    Index,
    Alert
})

export const DeleteAlert = (Index: number): AlertDeleteAction => ({
    type: ALERT_DELETE,
    Index
})

const initialAlertState: AlertState = {
  // let notificationCellUpdated: NotificationCellUpdated = new NotificationCellUpdated();
    Alerts: new TempNotificationCreator().CreateTempAlerts()
}

export const AlertReducer: Redux.Reducer<AlertState> = (state: AlertState = initialAlertState, action: Redux.Action): AlertState => {
    switch (action.type) {

        case ALERT_ADD_OR_UPDATE: {
            let actionTypedAddUpdate = (<AlertAddOrUpdateAction>action)
            let newAlerts: IAlert[] = [].concat(state.Alerts)
            if (actionTypedAddUpdate.Index == -1) {
                newAlerts.push(actionTypedAddUpdate.Alert)
            }
            else {
                newAlerts[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Alert
            }
            return Object.assign({}, state, { Alerts: newAlerts })
        }
        case ALERT_DELETE: {
            let newAlerts: IAlert[] = [].concat(state.Alerts)
            newAlerts.splice((<AlertDeleteAction>action).Index, 1)
            return Object.assign({}, state, { Alerts: newAlerts })
        }
        default:
            return state
    }
}