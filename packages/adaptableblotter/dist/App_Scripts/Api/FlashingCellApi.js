"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class FlashingCellApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().FlashingCell;
    }
    GetAll() {
        return this.getBlotterState().FlashingCell.FlashingCells;
    }
}
exports.FlashingCellApi = FlashingCellApi;
