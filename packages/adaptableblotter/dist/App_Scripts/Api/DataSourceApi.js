"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const DataSourceRedux = require("../Redux/ActionsReducers/DataSourceRedux");
const ApiBase_1 = require("./ApiBase");
class DataSourceApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().DataSource;
    }
    Set(dataSourceName) {
        let dataSource = this.getBlotterState().DataSource.DataSources.find(a => a.Name == dataSourceName);
        if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
            this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource.Name));
        }
    }
    Create(dataSourceName, dataSourceDescription) {
        let dataSource = {
            Name: dataSourceName,
            Description: dataSourceDescription
        };
        this.Add(dataSource);
    }
    Add(dataSource) {
        this.dispatchAction(DataSourceRedux.DataSourceAddUpdate(-1, dataSource));
    }
    Clear() {
        this.dispatchAction(DataSourceRedux.DataSourceSelect(""));
    }
}
exports.DataSourceApi = DataSourceApi;
