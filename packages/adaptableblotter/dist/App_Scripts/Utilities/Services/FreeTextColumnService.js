"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggingHelper_1 = require("../Helpers/LoggingHelper");
const ArrayExtensions_1 = require("../Extensions/ArrayExtensions");
class FreeTextColumnService {
    constructor(blotter) {
        this.blotter = blotter;
    }
    GetFreeTextValue(freeTextColumn, record) {
        try {
            if (this.blotter.isGroupRecord(record)) {
                return null;
            }
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(freeTextColumn.FreeTextStoredValues)) {
                let pkValue = this.blotter.getPrimaryKeyValueFromRecord(record);
                let freeTextStoredValue = freeTextColumn.FreeTextStoredValues.find(fdx => fdx.PrimaryKey == pkValue);
                if (freeTextStoredValue) {
                    return freeTextStoredValue.FreeText;
                }
            }
            return freeTextColumn.DefaultValue;
        }
        catch (e) {
            LoggingHelper_1.LoggingHelper.LogError(e);
            return null;
        }
    }
}
exports.FreeTextColumnService = FreeTextColumnService;
