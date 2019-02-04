"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';
exports.DataSourceSelect = (SelectedDataSource) => ({
    type: exports.DATA_SOURCE_SELECT,
    SelectedDataSource
});
const initialDataSourceState = {
    DataSources: GeneralConstants_1.EMPTY_ARRAY,
    CurrentDataSource: GeneralConstants_1.EMPTY_STRING
};
exports.DataSourceReducer = (state = initialDataSourceState, action) => {
    let index;
    switch (action.type) {
        case exports.DATA_SOURCE_SELECT:
            return Object.assign({}, state, { CurrentDataSource: action.SelectedDataSource });
        default:
            return state;
    }
};
