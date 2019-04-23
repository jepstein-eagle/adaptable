"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CellValidationRedux = require("../Redux/ActionsReducers/CellValidationRedux");
const ApiBase_1 = require("./ApiBase");
class CellValidationApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().CellValidation;
    }
    GetAll() {
        return this.getBlotterState().CellValidation.CellValidations;
    }
    Add(cellValidationRule) {
        this.dispatchAction(CellValidationRedux.CellValidationAddUpdate(-1, cellValidationRule));
    }
    Delete(cellValidationRule) {
        let index = this.GetAll().findIndex(cv => cv == cellValidationRule);
        this.dispatchAction(CellValidationRedux.CellValidationDelete(index));
    }
}
exports.CellValidationApi = CellValidationApi;
