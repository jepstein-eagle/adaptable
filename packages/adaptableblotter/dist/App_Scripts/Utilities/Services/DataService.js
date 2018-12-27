"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventDispatcher_1 = require("../EventDispatcher");
class DataService {
    constructor(blotter) {
        this.blotter = blotter;
        this._onDataSourceChanged = new EventDispatcher_1.EventDispatcher();
    }
    CreateDataSourcedChangedEvent(dataChangedEvent) {
        if (dataChangedEvent.NewValue != dataChangedEvent.OldValue) {
            this._onDataSourceChanged.Dispatch(this, dataChangedEvent);
        }
    }
    CreateDataEvent(identifierValue, newValue, columnId, record) {
        var dataChangedEvent = { OldValue: null, NewValue: newValue, ColumnId: columnId, IdentifierValue: identifierValue, Timestamp: Date.now(), Record: record };
        this.CreateDataSourcedChangedEvent(dataChangedEvent);
    }
    OnDataSourceChanged() {
        return this._onDataSourceChanged;
    }
}
exports.DataService = DataService;
