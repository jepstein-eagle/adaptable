"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const math = require("mathjs");
const AdaptableBlotterLogger_1 = require("../Helpers/AdaptableBlotterLogger");
class CalculatedColumnExpressionService {
    constructor(blotter, colFunctionValue) {
        this.blotter = blotter;
        this.colFunctionValue = colFunctionValue;
    }
    IsExpressionValid(expression) {
        try {
            let firstRecord = this.blotter.getFirstRecord();
            math.eval(expression, {
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
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning(e);
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
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError(e);
            return null;
        }
    }
    getColumnListFromExpression(expression) {
        let columnList = [];
        let regEx = /\b(?:Col\(")([a-zA-Z]+)(?:"\))/g;
        let match = regEx.exec(expression);
        while (match !== null) {
            columnList.push(match[1]);
            match = regEx.exec(expression);
        }
        return columnList;
    }
    Test(expression, record) {
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
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError(e);
            return null;
        }
    }
}
exports.CalculatedColumnExpressionService = CalculatedColumnExpressionService;
