"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.DATA_SOURCE_SELECT = 'DATA_SOURCE_SELECT';
exports.DATASOURCE_ADD_UPDATE = 'DATASOURCE_ADD_UPDATE';
exports.DATASOURCE_DELETE = 'DATASOURCE_DELETE';
exports.DATASOURCE_CHANGE_NAME = 'DATASOURCE_CHANGE_NAME';
exports.DATASOURCE_CHANGE_DESCRIPTION = 'DATASOURCE_CHANGE_DESCRIPTION';
exports.DataSourceSelect = (SelectedDataSource) => ({
    type: exports.DATA_SOURCE_SELECT,
    SelectedDataSource
});
exports.DataSourceAddUpdate = (index, DataSource) => ({
    type: exports.DATASOURCE_ADD_UPDATE,
    index,
    DataSource
});
exports.DataSourceChangeName = (DataSource, Name) => ({
    type: exports.DATASOURCE_CHANGE_NAME,
    DataSource,
    Name
});
exports.DataSourceChangeDescription = (DataSource, Description) => ({
    type: exports.DATASOURCE_CHANGE_DESCRIPTION,
    DataSource,
    Description
});
exports.DataSourceDelete = (DataSource) => ({
    type: exports.DATASOURCE_DELETE,
    DataSource
});
const initialDataSourceState = {
    DataSources: GeneralConstants_1.EMPTY_ARRAY,
    CurrentDataSource: GeneralConstants_1.EMPTY_STRING
};
exports.DataSourceReducer = (state = initialDataSourceState, action) => {
    let dataSources;
    switch (action.type) {
        case exports.DATA_SOURCE_SELECT:
            return Object.assign({}, state, { CurrentDataSource: action.SelectedDataSource });
        case exports.DATASOURCE_CHANGE_NAME: {
            let actionTyped = action;
            let DataSource = actionTyped.DataSource;
            dataSources = [].concat(state.DataSources);
            let index = dataSources.indexOf(DataSource);
            dataSources[index] = Object.assign({}, DataSource, { Name: actionTyped.Name });
            return Object.assign({}, state, { DataSources: dataSources });
        }
        case exports.DATASOURCE_CHANGE_DESCRIPTION: {
            let actionTyped = action;
            let DataSource = actionTyped.DataSource;
            dataSources = [].concat(state.DataSources);
            let index = dataSources.indexOf(DataSource);
            dataSources[index] = Object.assign({}, DataSource, { Description: actionTyped.Description });
            return Object.assign({}, state, { DataSources: dataSources });
        }
        case exports.DATASOURCE_ADD_UPDATE:
            let actionTypedAddUpdate = action;
            dataSources = [].concat(state.DataSources);
            if (actionTypedAddUpdate.index != -1) { // it exists
                dataSources[actionTypedAddUpdate.index] = actionTypedAddUpdate.DataSource;
            }
            else {
                dataSources.push(actionTypedAddUpdate.DataSource);
            }
            return Object.assign({}, state, { DataSources: dataSources }); //, CurrentDataSource: currentSearchName })
        case exports.DATASOURCE_DELETE: {
            let deletedDataSource = action.DataSource;
            dataSources = [].concat(state.DataSources);
            let index = dataSources.findIndex(x => x.Name == deletedDataSource.Name);
            dataSources.splice(index, 1);
            return Object.assign({}, state, { DataSources: dataSources });
        }
        default:
            return state;
    }
};
