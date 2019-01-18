"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const DataSourceRedux = require("../Redux/ActionsReducers/DataSourceRedux");
const ApiBase_1 = require("./ApiBase");
class DataSourceApi extends ApiBase_1.ApiBase {
    Set(dataSourceName) {
        let dataSource = this.getState().DataSource.DataSources.find(a => a == dataSourceName);
        if (this.checkItemExists(dataSource, dataSourceName, StrategyConstants.DataSourceStrategyName)) {
            this.dispatchAction(DataSourceRedux.DataSourceSelect(dataSource));
        }
    }
    Clear() {
        this.dispatchAction(DataSourceRedux.DataSourceSelect(""));
    }
}
exports.DataSourceApi = DataSourceApi;
