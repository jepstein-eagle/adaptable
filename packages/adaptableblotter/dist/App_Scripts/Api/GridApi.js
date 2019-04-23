"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
const Enums_1 = require("../Utilities/Enums");
class GridApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().Grid;
    }
    setGridData(dataSource) {
        this.blotter.setGridData(dataSource);
    }
    getColumns() {
        return this.getBlotterState().Grid.Columns;
    }
    getVisibleColumns() {
        return this.getBlotterState().Grid.Columns.filter(c => c.Visible);
    }
    getNumericColumns() {
        return this.getBlotterState().Grid.Columns.filter(c => c.DataType == Enums_1.DataType.Number);
    }
    getGridSorts() {
        return this.getBlotterState().Grid.GridSorts;
    }
}
exports.GridApi = GridApi;
