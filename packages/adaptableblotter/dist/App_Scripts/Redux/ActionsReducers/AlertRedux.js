"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALERT_DEFIINITION_ADD_UPDATE = 'ALERT_DEFIINITION_ADD_UPDATE';
exports.ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';
exports.ALERT_DEFIINITION_SELECT = 'ALERT_DEFIINITION_SELECT';
exports.ALERT_DEFIINITION_CHANGE_ALERT_TYPE = 'ALERT_DEFIINITION_CHANGE_ALERT_TYPE';
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
const initialAlertState = {
    AlertDefinitions: [],
    MaxAlertsInStore: 5,
    AlertPopupDiv: "alertshere"
};
exports.AlertReducer = (state = initialAlertState, action) => {
    let alertDefinitions;
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
        default:
            return state;
    }
};
