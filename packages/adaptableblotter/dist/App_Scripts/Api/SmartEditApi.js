"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SmartEditRedux = require("../Redux/ActionsReducers/SmartEditRedux");
const ApiBase_1 = require("./ApiBase");
class SmartEditApi extends ApiBase_1.ApiBase {
    getSmartEditState() {
        return this.getBlotterState().SmartEdit;
    }
    setSmartEditMathOperation(mathOperation) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeOperation(mathOperation));
    }
    getSmartEditMathOperation() {
        return this.getBlotterState().SmartEdit.MathOperation;
    }
    setSmartEditValue(smartEditValue) {
        this.dispatchAction(SmartEditRedux.SmartEditChangeValue(smartEditValue));
    }
    getSmartEditValue() {
        return this.getBlotterState().SmartEdit.SmartEditValue;
    }
}
exports.SmartEditApi = SmartEditApi;
