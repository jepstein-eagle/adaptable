"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class ConditionalStyleApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().ConditionalStyle;
    }
    GetAll() {
        return this.getBlotterState().ConditionalStyle.ConditionalStyles;
    }
}
exports.ConditionalStyleApi = ConditionalStyleApi;
