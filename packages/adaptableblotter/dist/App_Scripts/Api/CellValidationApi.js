"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CellValidationRedux = require("../Redux/ActionsReducers/CellValidationRedux");
const ApiBase_1 = require("./ApiBase");
class CellValidationApi extends ApiBase_1.ApiBase {
    getCellValidationState() {
        return this.getBlotterState().CellValidation;
    }
    getAllCellValidation() {
        return this.getCellValidationState().CellValidations;
    }
    addCellValidation(cellValidationRule) {
        this.dispatchAction(CellValidationRedux.CellValidationAddUpdate(-1, cellValidationRule));
    }
    deleteCellValidation(cellValidationRule) {
        let index = this.getAllCellValidation().findIndex(cv => cv == cellValidationRule);
        this.dispatchAction(CellValidationRedux.CellValidationDelete(index));
    }
}
exports.CellValidationApi = CellValidationApi;
