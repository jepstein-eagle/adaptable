import { AlertState } from './Interface/IState';
import * as Redux from 'redux'
import { IAlertDefinition } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { AlertType } from '../../Core/Enums';

export const ALERT_ADD_UPDATE = 'ALERT_ADD_UPDATE';
export const ALERT_DELETE = 'ALERT_DELETE';
export const ALERT_SELECT = 'ALERT_SELECT';
export const ALERT_CHANGE_ALERT_TYPE = 'ALERT_CHANGE_ALERT_TYPE';

export interface AlertAddUpdateAction extends Redux.Action {
    Index: number
    Alert: IAlertDefinition
}

export interface AlertDeleteAction extends Redux.Action {
    Index: number
}

export interface AlertChangeAlertTypeAction extends Redux.Action {
    Index: number,
    AlertType: AlertType;
}


export const AlertAddUpdate = (Index: number, Alert: IAlertDefinition): AlertAddUpdateAction => ({
    type: ALERT_ADD_UPDATE,
    Index,
    Alert
})

export const AlertDelete = (Index: number): AlertDeleteAction => ({
    type: ALERT_DELETE,
    Index,
  })

export const AlertChangeAlertType = (Index: number, AlertType: AlertType): AlertChangeAlertTypeAction => ({
    type: ALERT_CHANGE_ALERT_TYPE,
    Index,
    AlertType
})

const initialAlertState: AlertState = {
    AlertDefinitions: []
}

export const AlertReducer: Redux.Reducer<AlertState> = (state: AlertState = initialAlertState, action: Redux.Action): AlertState => {
    let alertDefinitions: IAlertDefinition[]

    switch (action.type) {
        case ALERT_ADD_UPDATE:{
            let actionTypedAddUpdate = (<AlertAddUpdateAction>action)
            alertDefinitions = [].concat(state.AlertDefinitions)
            if (actionTypedAddUpdate.Index != -1) {  // it exists
                alertDefinitions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.Alert
            } else {
                alertDefinitions.push(actionTypedAddUpdate.Alert)
            }
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions })
        }
        case ALERT_DELETE:{
            let actionTypedDelete = (<AlertDeleteAction>action)
            alertDefinitions = [].concat(state.AlertDefinitions)
            alertDefinitions.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions })
        }
            case ALERT_CHANGE_ALERT_TYPE: {
                let actionTyped = (<AlertChangeAlertTypeAction>action)
                alertDefinitions = [].concat(state.AlertDefinitions)
                let alert = alertDefinitions[actionTyped.Index]
                alertDefinitions[actionTyped.Index] = Object.assign({}, alert, { AlertType: actionTyped.AlertType })
                return Object.assign({}, state, { AlertDefinitions: alertDefinitions })
            }
        default:
            return state
    }
}