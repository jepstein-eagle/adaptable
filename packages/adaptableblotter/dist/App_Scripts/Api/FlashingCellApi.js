"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class FlashingCellApi extends ApiBase_1.ApiBase {
    getFlashingCellState() {
        return this.getBlotterState().FlashingCell;
    }
    getAllFlashingCell() {
        return this.getFlashingCellState().FlashingCells;
    }
}
exports.FlashingCellApi = FlashingCellApi;
