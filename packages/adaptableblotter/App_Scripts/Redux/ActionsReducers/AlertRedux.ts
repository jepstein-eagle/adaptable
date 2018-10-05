import { AlertState } from './Interface/IState';
import * as Redux from 'redux'
import { IAlertDefinition } from '../../Core/Api/Interface/IAdaptableBlotterObjects';
import { MessageType } from '../../Core/Enums';
import { IAlert } from '../../Core/Interface/IMessage';

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

export interface AlertDefinitionChangeMessageTypeAction extends Redux.Action {
    Index: number,
    MessageType: MessageType;
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


const initialAlertState: AlertState = {
    AlertDefinitions: [],
    MaxAlertsInStore: 5,
    AlertPopupDiv : "alertshere"
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
            let actionTyped = (<AlertDefinitionChangeMessageTypeAction>action)
            alertDefinitions = [].concat(state.AlertDefinitions)
            let alert = alertDefinitions[actionTyped.Index]
            alertDefinitions[actionTyped.Index] = Object.assign({}, alert, { MessageType: actionTyped.MessageType })
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions })
        }

       
        default:
            return state
    }
}