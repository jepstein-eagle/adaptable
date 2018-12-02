"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';
exports.DataSourceSelect = (SelectedDataSource) => ({
    type: exports.DATA_SOURCE_SELECT,
    SelectedDataSource
});
const initialDataSourceState = {
    DataSources: [],
    CurrentDataSource: ""
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
