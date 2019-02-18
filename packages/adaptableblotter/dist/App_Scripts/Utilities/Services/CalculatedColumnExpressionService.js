"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math = require("mathjs");
const LoggingHelper_1 = require("../Helpers/LoggingHelper");
const CalculatedColumnHelper_1 = require("../Helpers/CalculatedColumnHelper");
class CalculatedColumnExpressionService {
    constructor(blotter, colFunctionValue) {
        this.blotter = blotter;
        this.colFunctionValue = colFunctionValue;
    }
    IsExpressionValid(expression) {
        try {
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            let cleanedExpression = CalculatedColumnHelper_1.CalculatedColumnHelper.CleanExpressionColumnNames(expression, columns);
            let firstRecord = this.blotter.getFirstRecord();
            math.eval(cleanedExpression, {
                Col: (columnId) => {
                    try {
                        return this.colFunctionValue(columnId, firstRecord);
                    }
                    catch (e) {
                        throw Error("Unknown column " + columnId);
                    }
                }
            });
            return { IsValid: true };
        }
        catch (e) {
            LoggingHelper_1.LoggingHelper.LogWarning(e);
            return { IsValid: false, ErrorMsg: e.message };
        }
    }
    ComputeExpressionValue(expression, record) {
        try {
            if (this.blotter.isGroupRecord(record)) {
                return null;
            }
            return math.eval(expression, {
                node: record,
                Col: (columnId) => {
                    try {
                        return this.colFunctionValue(columnId, record);
                    }
                    catch (e) {
                        throw Error("Unknown column " + columnId);
                    }
                }
            });
        }
        catch (e) {
            LoggingHelper_1.LoggingHelper.LogError(e);
            return null;
        }
    }
}
exports.CalculatedColumnExpressionService = CalculatedColumnExpressionService;
