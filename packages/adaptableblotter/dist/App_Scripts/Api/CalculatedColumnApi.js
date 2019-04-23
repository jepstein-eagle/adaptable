"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalculatedColumnRedux = require("../Redux/ActionsReducers/CalculatedColumnRedux");
const ApiBase_1 = require("./ApiBase");
class CalculatedColumnApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().CalculatedColumn;
    }
    GetAll() {
        return this.getBlotterState().CalculatedColumn.CalculatedColumns;
    }
    Add(calculatedColumn) {
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnAdd(calculatedColumn));
    }
    EditExpression(column, columnExpression) {
        let calcColumn = this.GetAll().find(cc => cc.ColumnId == column);
        let calcColumnIndex = this.GetAll().findIndex(cc => cc.ColumnId == column);
        calcColumn.ColumnExpression = columnExpression;
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnEdit(calcColumnIndex, calcColumn));
    }
    Delete(column) {
        let calcColumnIndex = this.GetAll().findIndex(cc => cc.ColumnId == column);
        this.dispatchAction(CalculatedColumnRedux.CalculatedColumnDelete(calcColumnIndex));
    }
}
exports.CalculatedColumnApi = CalculatedColumnApi;
