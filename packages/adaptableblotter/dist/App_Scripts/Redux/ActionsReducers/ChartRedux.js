"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHART_DEFINITION_SELECT = 'CHART_DEFINITION_SELECT';
exports.CHART_DEFINITION_ADD_UPDATE = 'CHART_DEFINITION_ADD_UPDATE';
exports.CHART_DEFINITION_EDIT = 'CHART_DEFINITION_EDIT';
exports.CHART_DEFINITION_DELETE = 'CHART_DEFINITION_DELETE';
exports.ChartDefinitionAddUpdate = (Index, ChartDefinition) => ({
    type: exports.CHART_DEFINITION_ADD_UPDATE,
    Index,
    ChartDefinition
});
exports.ChartDefinitionDelete = (ChartDefinition) => ({
    type: exports.CHART_DEFINITION_DELETE,
    ChartDefinition
});
exports.ChartDefinitionSelect = (SelectedChartDefinitionName) => ({
    type: exports.CHART_DEFINITION_SELECT,
    SelectedChartDefinitionName
});
const initialChartState = {
    ChartDefinitions: [],
    CurrentChartName: '',
    ChartData: null
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
            return Object.assign({}, state, { ChartDefinitions: chartDefinitions }); //, CurrentAdvancedSearch: currentSearchName })
        case exports.CHART_DEFINITION_DELETE:
            chartDefinitions = [].concat(state.ChartDefinitions);
            let index = chartDefinitions.findIndex(x => x.Name == action.ChartDefinition.Name);
            chartDefinitions.splice(index, 1);
            return Object.assign({}, state, {
                ChartDefinitions: chartDefinitions
            });
        case exports.CHART_DEFINITION_SELECT:
            return Object.assign({}, state, { CurrentChartName: action.SelectedChartDefinitionName });
        default:
            return state;
    }
};
