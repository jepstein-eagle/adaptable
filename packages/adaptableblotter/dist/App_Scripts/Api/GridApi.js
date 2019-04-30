"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
const Enums_1 = require("../Utilities/Enums");
class GridApi extends ApiBase_1.ApiBase {
    getGridState() {
        return this.getBlotterState().Grid;
    }
    setGridData(dataSource) {
        this.blotter.setGridData(dataSource);
    }
    getColumns() {
        return this.getGridState().Columns;
    }
    getSelectedCellInfo() {
        return this.getGridState().SelectedCellInfo;
    }
    getVisibleColumns() {
        return this.getColumns().filter(c => c.Visible);
    }
    getNumericColumns() {
        return this.getColumns().filter(c => c.DataType == Enums_1.DataType.Number);
    }
    getGridSorts() {
        return this.getGridState().GridSorts;
    }
}
exports.GridApi = GridApi;
