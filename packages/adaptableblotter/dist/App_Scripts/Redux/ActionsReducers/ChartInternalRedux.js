"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHART_INTERNAL_SHOW_CHART = 'CHART_INTERNAL_SHOW_CHART';
exports.CHART_INTERNAL_HIDE_CHART = 'CHART_INTERNAL_HIDE_CHART';
exports.CHART_INTERNAL_SET_CHART_DATA = 'CHART_INTERNAL_SET_CHART_DATA';
exports.CHART_INTERNAL_DEFINITION_SELECT = 'CHART_INTERNAL_DEFINITION_SELECT';
exports.ChartInternalShowChart = () => ({
    type: exports.CHART_INTERNAL_SHOW_CHART
});
exports.ChartInternalHideChart = () => ({
    type: exports.CHART_INTERNAL_HIDE_CHART,
});
exports.ChartInternalSetChartData = (chartData) => ({
    type: exports.CHART_INTERNAL_SET_CHART_DATA,
    chartData
});
exports.ChartDefinitionSelect = (CurrentChartDefinition) => ({
    type: exports.CHART_INTERNAL_DEFINITION_SELECT,
    CurrentChartDefinition
});
const initialChartInternalState = {
    ChartData: null,
    ChartVisible: false,
    CurrentChartDefinition: null
};
exports.ChartInternalReducer = (state = initialChartInternalState, action) => {
    switch (action.type) {
        case exports.CHART_INTERNAL_SHOW_CHART:
            return Object.assign({}, state, { ChartVisible: true });
        case exports.CHART_INTERNAL_HIDE_CHART:
            return Object.assign({}, state, { ChartVisible: false });
        case exports.CHART_INTERNAL_SET_CHART_DATA:
            return Object.assign({}, state, { ChartData: action.chartData });
        case exports.CHART_INTERNAL_DEFINITION_SELECT:
            return Object.assign({}, state, { CurrentChartDefinition: action.CurrentChartDefinition });
        default:
            return state;
    }
};
