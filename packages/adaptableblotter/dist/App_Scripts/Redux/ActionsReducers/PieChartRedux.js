"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
//const PIE_CHART_SELECT = 'PIE_CHART_SELECT';
const initialPieChartState = {
    PieCharts: GeneralConstants_1.EMPTY_ARRAY
};
exports.PieChartReducer = (state = initialPieChartState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
