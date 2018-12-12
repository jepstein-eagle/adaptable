"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CHART_INTERNAL_SHOW_CHART = 'CHART_INTERNAL_SHOW_CHART';
const CHART_INTERNAL_HIDE_CHART = 'CHART_INTERNAL_HIDE_CHART';
const CHART_INTERNAL_SET_CHART_DATA = 'CHART_INTERNAL_SET_CHART_DATA';
const CHART_INTERNAL_DEFINITION_SELECT = 'CHART_INTERNAL_DEFINITION_SELECT';
exports.ChartInternalShowChart = () => ({
    type: CHART_INTERNAL_SHOW_CHART
});
exports.ChartInternalHideChart = () => ({
    type: CHART_INTERNAL_HIDE_CHART,
});
exports.ChartInternalSetChartData = (chartData) => ({
    type: CHART_INTERNAL_SET_CHART_DATA,
    chartData
});
exports.ChartDefinitionSelect = (CurrentChartDefinition) => ({
    type: CHART_INTERNAL_DEFINITION_SELECT,
    CurrentChartDefinition
});
const initialChartInternalState = {
    ChartData: null,
    ChartVisible: false,
    CurrentChartDefinition: null
};
exports.ChartInternalReducer = (state = initialChartInternalState, action) => {
    switch (action.type) {
        case CHART_INTERNAL_SHOW_CHART:
            return Object.assign({}, state, { ChartVisible: true });
        case CHART_INTERNAL_HIDE_CHART:
            return Object.assign({}, state, { ChartVisible: false });
        case CHART_INTERNAL_SET_CHART_DATA:
            return Object.assign({}, state, { ChartData: action.chartData });
        case CHART_INTERNAL_DEFINITION_SELECT:
            return Object.assign({}, state, { CurrentChartDefinition: action.CurrentChartDefinition });
        default:
            return state;
    }
};
