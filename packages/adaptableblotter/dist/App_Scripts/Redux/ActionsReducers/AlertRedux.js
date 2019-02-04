"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.ALERT_DEFIINITION_ADD_UPDATE = 'ALERT_DEFIINITION_ADD_UPDATE';
exports.ALERT_DEFIINITION_DELETE = 'ALERT_DEFIINITION_DELETE';
exports.ALERT_DEFIINITION_SELECT = 'ALERT_DEFIINITION_SELECT';
exports.ALERT_DEFIINITION_CHANGE_ALERT_TYPE = 'ALERT_DEFIINITION_CHANGE_ALERT_TYPE';
exports.AlertDefinitionAddUpdate = (index, alertDefinition) => ({
    type: exports.ALERT_DEFIINITION_ADD_UPDATE,
    index,
    alertDefinition
});
exports.AlertDefinitionDelete = (index) => ({
    type: exports.ALERT_DEFIINITION_DELETE,
    index,
});
exports.AlertDefinitionChangeMessageType = (index, messageType) => ({
    type: exports.ALERT_DEFIINITION_CHANGE_ALERT_TYPE,
    index,
    messageType
});
const initialAlertState = {
    AlertDefinitions: GeneralConstants_1.EMPTY_ARRAY,
    MaxAlertsInStore: GeneralConstants_1.ALERT_DEFAULT_MAX_ALERTS_IN_STORE,
    AlertPopupDiv: GeneralConstants_1.EMPTY_STRING
};
exports.AlertReducer = (state = initialAlertState, action) => {
    let alertDefinitions;
    switch (action.type) {
        case exports.ALERT_DEFIINITION_ADD_UPDATE: {
            let actionTypedAddUpdate = action;
            alertDefinitions = [].concat(state.AlertDefinitions);
            if (actionTypedAddUpdate.index != -1) { // it exists
                alertDefinitions[actionTypedAddUpdate.index] = actionTypedAddUpdate.alertDefinition;
            }
            else {
                alertDefinitions.push(actionTypedAddUpdate.alertDefinition);
            }
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
        }
        case exports.ALERT_DEFIINITION_DELETE: {
            let actionTypedDelete = action;
            alertDefinitions = [].concat(state.AlertDefinitions);
            alertDefinitions.splice(actionTypedDelete.index, 1);
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
        }
        case exports.ALERT_DEFIINITION_CHANGE_ALERT_TYPE: {
            let actionTyped = action;
            alertDefinitions = [].concat(state.AlertDefinitions);
            let alert = alertDefinitions[actionTyped.index];
            alertDefinitions[actionTyped.index] = Object.assign({}, alert, { MessageType: actionTyped.messageType });
            return Object.assign({}, state, { AlertDefinitions: alertDefinitions });
        }
        default:
            return state;
    }
};
