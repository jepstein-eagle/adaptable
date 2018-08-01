import { AlertState } from './Interface/IState';
import * as Redux from 'redux'
import { IAlertDefinition } from '../../Core/Api/Interface/AdaptableBlotterObjects';
import { AlertType } from '../../Core/Enums';

export const ALERT_DEFIINITION_ADD_UPDATE = 'ALERT_DEFIINITION_ADD_UPDATE';
export const ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';
export const ALERT_DEFIINITION_SELECT = 'ALERT_DEFIINITION_SELECT';
export const ALERT_DEFIINITION_CHANGE_ALERT_TYPE = 'ALERT_DEFIINITION_CHANGE_ALERT_TYPE';

export interface AlertDefinitionAddUpdateAction extends Redux.Action {
    Index: number
    AlertDefinition: IAlertDefinition
}

export interface AlertDefinitionDeleteAction extends Redux.Action {
    Index: number
}

export interface AlertDefinitionChangeAlertTypeAction extends Redux.Action {
    Index: number,
    AlertType: AlertType;
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

export const AlertDefinitionChangeAlertType = (Index: number, AlertType: AlertType): AlertDefinitionChangeAlertTypeAction => ({
    type: ALERT_DEFIINITION_CHANGE_ALERT_TYPE,
    Index,
    AlertType
})

const initialAlertState: AlertState = {
    AlertDefinitions: [], 
    MaxAlertsInStore: 20,
    Alerts:  []
}

export const AlertReducer: Redux.Reducer<AlertState> = (state: AlertState = initialAlertState, action: Redux.Action): AlertState => {
    let alertDefinitions: IAlertDefinition[]

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
            let actionTyped = (<AlertDefinitionChangeAlertTypeAction>action)
            alertDefinitions = [].concat(state.AlertDefinitions)
            let alert = alertDefinitions[actionTyped.Index]
            alertDefinitions[actionTyped.Index] = Object.assign({}, alert, { AlertType: actionTyped.AlertType })
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions })
        }
        default:
            return state
    }
}