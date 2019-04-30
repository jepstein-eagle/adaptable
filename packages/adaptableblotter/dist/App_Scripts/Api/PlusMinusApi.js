"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class PlusMinusApi extends ApiBase_1.ApiBase {
    getPlusMinusState() {
        return this.getBlotterState().PlusMinus;
    }
    getAllPlusMinus() {
        return this.getPlusMinusState().PlusMinusRules;
    }
}
exports.PlusMinusApi = PlusMinusApi;
