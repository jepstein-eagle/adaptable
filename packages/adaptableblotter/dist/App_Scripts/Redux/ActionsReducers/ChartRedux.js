"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.CHART_DEFINITION_ADD_UPDATE = 'CHART_DEFINITION_ADD_UPDATE';
exports.CHART_PROPERTIES_UPDATE = 'CHART_PROPERTIES_UPDATE';
exports.CHART_DEFINITION_EDIT = 'CHART_DEFINITION_EDIT';
exports.CHART_DEFINITION_DELETE = 'CHART_DEFINITION_DELETE';
exports.CHART_DEFINITION_SELECT = 'CHART_DEFINITION_SELECT';
exports.ChartDefinitionAddUpdate = (Index, ChartDefinition) => ({
    type: exports.CHART_DEFINITION_ADD_UPDATE,
    Index,
    ChartDefinition
});
exports.ChartPropertiesUpdate = (ChartName, ChartProperties) => ({
    type: exports.CHART_PROPERTIES_UPDATE,
    ChartName,
    ChartProperties
});
exports.ChartDefinitionDelete = (ChartDefinition) => ({
    type: exports.CHART_DEFINITION_DELETE,
    ChartDefinition
});
exports.ChartDefinitionSelect = (CurrentChartName) => ({
    type: exports.CHART_DEFINITION_SELECT,
    CurrentChartName
});
const initialChartState = {
    ChartDefinitions: [],
    CurrentChartName: GeneralConstants_1.EMPTY_STRING,
    RefreshRate: GeneralConstants_1.CHART_DEFAULT_REFRESH_RATE
};
exports.ChartReducer = (state = initialChartState, action) => {
    let chartDefinitions;
    switch (action.type) {
        case exports.CHART_DEFINITION_ADD_UPDATE:
            let actionTypedAddUpdate = action;
            chartDefinitions = [].concat(state.ChartDefinitions);
            if (actionTypedAddUpdate.Index != -1) { // it exists
                chartDefinitions[actionTypedAddUpdate.Index] = actionTypedAddUpdate.ChartDefinition;
            }
            else {
                chartDefinitions.push(actionTypedAddUpdate.ChartDefinition);
            }
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions });
        case exports.CHART_PROPERTIES_UPDATE:
            let actionTypedPropertiesUpdate = action;
            chartDefinitions = [].concat(state.ChartDefinitions);
            let chartDefinition = chartDefinitions.find(c => c.Name == actionTypedPropertiesUpdate.ChartName);
            chartDefinition.ChartProperties = actionTypedPropertiesUpdate.ChartProperties;
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions });
        case exports.CHART_DEFINITION_DELETE:
            chartDefinitions = [].concat(state.ChartDefinitions);
            let index = chartDefinitions.findIndex(x => x.Name == action.ChartDefinition.Name);
            chartDefinitions.splice(index, 1);
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions });
        case exports.CHART_DEFINITION_SELECT:
            return Object.assign({}, state, { CurrentChartName: action.CurrentChartName });
        default:
            return state;
    }
};
