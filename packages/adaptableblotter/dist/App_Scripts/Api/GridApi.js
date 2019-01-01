"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class GridApi extends ApiBase_1.ApiBase {
    setGridData(dataSource) {
        this.blotter.setGridData(dataSource);
    }
}
exports.GridApi = GridApi;
