"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALERT_DEFIINITION_ADD_UPDATE = 'ALERT_DEFIINITION_ADD_UPDATE';
exports.ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';
exports.ALERT_DEFIINITION_SELECT = 'ALERT_DEFIINITION_SELECT';
exports.ALERT_DEFIINITION_CHANGE_ALERT_TYPE = 'ALERT_DEFIINITION_CHANGE_ALERT_TYPE';
exports.ALERT_ADD = 'ALERT_ADD';
exports.ALERT_DELETE = 'ALERT_DELETE';
exports.ALERT_DELETE_ALL = 'ALERT_DELETE_ALL';
exports.AlertDefinitionAddUpdate = (Index, AlertDefinition) => ({
    type: exports.ALERT_DEFIINITION_ADD_UPDATE,
    Index,
    AlertDefinition
});
exports.AlertDefinitionDelete = (Index) => ({
    type: exports.ALERT_DEFIINITION_DELETE,
    Index,
});
exports.AlertDefinitionChangeMessageType = (Index, MessageType) => ({
    type: exports.ALERT_DEFIINITION_CHANGE_ALERT_TYPE,
    Index,
    MessageType
});
exports.AlertAdd = (Alert) => ({
    type: exports.ALERT_ADD,
    Alert
});
exports.AlertDelete = (Index) => ({
    type: exports.ALERT_DELETE,
    Index,
});
exports.AlertDeleteAll = () => ({
    type: exports.ALERT_DELETE_ALL,
});
const initialAlertState = {
    AlertDefinitions: [],
    MaxAlertsInStore: 5,
    Alerts: []
};
exports.AlertReducer = (state = initialAlertState, action) => {
    let alertDefinitions;
    let alerts;
    switch (action.type) {
        case exports.ALERT_DEFIINITION_ADD_UPDATE: {
            let actionTypedAddUpdate = action;
            alertDefinitions = [].concat(state.AlertDefinitions);
            if (actionTypedAddUpdate.Index != -1) { // it exists
                alertDefinitions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.AlertDefinition;
            }
            else {
                alertDefinitions.push(actionTypedAddUpdate.AlertDefinition);
            }
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
        }
        case exports.ALERT_DEFIINITION_DELETE: {
            let actionTypedDelete = action;
            alertDefinitions = [].concat(state.AlertDefinitions);
            alertDefinitions.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
        }
        case exports.ALERT_DEFIINITION_CHANGE_ALERT_TYPE: {
            let actionTyped = action;
            alertDefinitions = [].concat(state.AlertDefinitions);
            let alert = alertDefinitions[actionTyped.Index];
            alertDefinitions[actionTyped.Index] = Object.assign({}, alert, { MessageType: actionTyped.MessageType });
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
        }
        case exports.ALERT_ADD: {
            let actionTypedAdd = action;
            alerts = [].concat(state.Alerts);
            if (alerts.length == state.MaxAlertsInStore) { // we have hit the maximum so remove first item (oldest)
                alerts.splice(0, 1);
            }
            alerts.push(actionTypedAdd.Alert);
            return Object.assign({}, state, { Alerts: alerts });
        }
        case exports.ALERT_DELETE: {
            let actionTypedDelete = action;
            alerts = [].concat(state.Alerts);
            alerts.splice(actionTypedDelete.Index, 1);
            return Object.assign({}, state, { Alerts: alerts });
        }
        case exports.ALERT_DELETE_ALL: {
            return Object.assign({}, state, { Alerts: [] });
        }
        default:
            return state;
    }
};
