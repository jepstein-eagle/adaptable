"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SmartEditRedux = require("../Redux/ActionsReducers/SmartEditRedux");
const ApiBase_1 = require("./ApiBase");
class SmartEditApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().SmartEdit;
    }
    SetMathOperation(mathOperation) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation));
    }
    GetMathOperation() {
        return this.getBlotterState().SmartEdit.MathOperation;
    }
    SetValue(smartEditValue) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue));
    }
    GetValue() {
        return this.getBlotterState().SmartEdit.SmartEditValue;
    }
}
exports.SmartEditApi = SmartEditApi;
