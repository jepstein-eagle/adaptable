"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventDispatcher_1 = require("../EventDispatcher");
class DataService {
    constructor(blotter) {
        this.blotter = blotter;
        this._onDataSourceChanged = new EventDispatcher_1.EventDispatcher();
        // create the _columnValueList - will be empty - used primarily for flashing cell
        this._columnValueList = new Map();
    }
    CreateDataChangedEvent(dataChangedInfo) {
        if (dataChangedInfo.NewValue != dataChangedInfo.OldValue) {
            this._onDataSourceChanged.Dispatch(this, dataChangedInfo);
        }
    }
    OnDataSourceChanged() {
        return this._onDataSourceChanged;
    }
    clearFlashingCellMap() {
        this._columnValueList.clear();
    }
    GetPreviousColumnValue(columnId, identifierValue, newValue) {
        let columnValueList = this.getCellValuesForColumn(columnId);
        let oldValue = columnValueList.get(identifierValue);
        columnValueList.set(identifierValue, newValue);
        return (oldValue) ? oldValue : newValue;
    }
    getCellValuesForColumn(columnId) {
        // first check the list exists; if not, then create it
        if (this._columnValueList.size == 0) {
            this._columnValueList.set(columnId, new Map());
        }
        // get the item
        let returnList = this._columnValueList.get(columnId);
        //in case we created a new calculated column  - need to worry about this?
        if (!returnList) {
            returnList = new Map();
            this._columnValueList.set(columnId, returnList);
        }
        return returnList;
    }
}
exports.DataService = DataService;
