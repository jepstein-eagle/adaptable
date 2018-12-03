"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BlotterApiBase_1 = require("../api/BlotterApiBase");
class BlotterApi extends BlotterApiBase_1.BlotterApiBase {
    constructor(blotter) {
        super(blotter);
        this.blotter = blotter;
    }
    setGridData(dataSource) {
        let theBlotter = this.blotter;
        theBlotter.setGridData(dataSource);
    }
}
exports.BlotterApi = BlotterApi;
