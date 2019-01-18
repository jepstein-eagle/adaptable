"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventDispatcher_1 = require("../EventDispatcher");
const IDataService_1 = require("./Interface/IDataService");
// Used to be the Audit Service - now much reduced
// Doesnt store any data (other than for flashing cell) - simply responsible for publishing DataChanged Events
class DataService {
    constructor(blotter) {
        this.blotter = blotter;
        this._onDataSourceChanged = new EventDispatcher_1.EventDispatcher();
        // create the _columnValueList - will be empty - used currrently only for flashing cell
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
    GetPreviousColumnValue(columnId, identifierValue, newValue, changeDirection) {
        let columnValueList = this.getCellValuesForColumn(columnId);
        let oldValue = columnValueList.get(identifierValue);
        // this horrible code is for dealing with ag-Grid because it comes in twice for Flashing Cell and we only want to return (and save!) a value if its the correct direction
        if (oldValue) {
            switch (changeDirection) {
                case IDataService_1.ChangeDirection.Up:
                    if (oldValue >= newValue) {
                        return null;
                    }
                    break;
                case IDataService_1.ChangeDirection.Down:
                    if (oldValue <= newValue) {
                        return null;
                    }
                    break;
                case IDataService_1.ChangeDirection.Ignore:
                    // do nothing
                    break;
            }
        }
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
