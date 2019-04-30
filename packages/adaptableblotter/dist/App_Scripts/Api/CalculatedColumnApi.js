"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalculatedColumnRedux = require("../Redux/ActionsReducers/CalculatedColumnRedux");
const ApiBase_1 = require("./ApiBase");
class CalculatedColumnApi extends ApiBase_1.ApiBase {
    getCalculatedColumnState() {
        return this.getBlotterState().CalculatedColumn;
    }
    getAllCalculatedColumn() {
        return this.getCalculatedColumnState().CalculatedColumns;
    }
    addCalculatedColumn(calculatedColumn) {
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn));
    }
    editCalculatedColumnExpression(column, columnExpression) {
        let calcColumn = this.getAllCalculatedColumn().find(cc => cc.ColumnId == column);
        let calcColumnIndex = this.getAllCalculatedColumn().findIndex(cc => cc.ColumnId == column);
        calcColumn.ColumnExpression = columnExpression;
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumnIndex, calcColumn));
    }
    deleteCalculatedColumn(column) {
        let calcColumnIndex = this.getAllCalculatedColumn().findIndex(cc => cc.ColumnId == column);
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumnIndex));
    }
}
exports.CalculatedColumnApi = CalculatedColumnApi;
