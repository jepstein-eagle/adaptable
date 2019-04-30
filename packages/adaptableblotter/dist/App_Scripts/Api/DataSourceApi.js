"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const DataSourceRedux = require("../Redux/ActionsReducers/DataSourceRedux");
const ApiBase_1 = require("./ApiBase");
class DataSourceApi extends ApiBase_1.ApiBase {
    getDataSourceState() {
        return this.getBlotterState().DataSource;
    }
    getAllDataSource() {
        return this.getDataSourceState().DataSources;
    }
    getCurrentDataSource() {
        let currentDataSourceName = this.getDataSourceState().CurrentDataSource;
        return this.getDataSourceByName(currentDataSourceName);
    }
    getDataSourceByName(dataSourceName) {
        return this.getAllDataSource().find(a => a.Name == dataSourceName);
    }
    setDataSource(dataSourceName) {
        let dataSource = this.getBlotterState().DataSource.DataSources.find(a => a.Name == dataSourceName);
        if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
            this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource.Name));
        }
    }
    createDataSource(dataSourceName, dataSourceDescription) {
        let dataSource = {
            Name: dataSourceName,
            Description: dataSourceDescription
        };
        this.addDataSource(dataSource);
    }
    addDataSource(dataSource) {
        this.dispatchAction(DataSourceRedux.DataSourceAddUpdate(-1, dataSource));
    }
    clearDataSource() {
        this.dispatchAction(DataSourceRedux.DataSourceSelect(""));
    }
}
exports.DataSourceApi = DataSourceApi;
