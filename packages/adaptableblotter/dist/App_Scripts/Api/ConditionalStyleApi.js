"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class ConditionalStyleApi extends ApiBase_1.ApiBase {
    getConditionalStyleState() {
        return this.getBlotterState().ConditionalStyle;
    }
    getAllConditionalStyle() {
        return this.getConditionalStyleState().ConditionalStyles;
    }
}
exports.ConditionalStyleApi = ConditionalStyleApi;
